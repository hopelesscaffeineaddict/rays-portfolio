// worker/index.js

const TTP_RULES = [
  { name: 'SQL Injection', pattern: /(union\s+select|'\s*or\s*'|;\s*drop)/i, severity: 'high', technique: 'T1190' },
  { name: 'Path Traversal', pattern: /(\.\.\/|\.\.\\|%2e%2e)/i, severity: 'medium', technique: 'T1083' },
  { name: 'Scanner UA',     pattern: /(sqlmap|nikto|nmap)/i,                  severity: 'low',    technique: 'T1595' }
];

export default {
  async fetch(request, env, ctx) {
    const url = request.url.toLowerCase();
    const ua  = (request.headers.get('User-Agent') || '').toLowerCase();

    // === DETECTION: Check for suspicious patterns ===
    for (const rule of TTP_RULES) {
      const searchSpace = rule.name === 'Scanner UA' ? ua : url;
      if (rule.pattern.test(searchSpace)) {
        console.log('SECURITY_ALERT:', JSON.stringify({
          rule: rule.name,
          severity: rule.severity,
          technique: rule.technique,
          uri: request.url,
          ip: request.headers.get('cf-connecting-ip'),
          timestamp: new Date().toISOString()
        }));

        if (rule.severity === 'high') {
          return new Response('Blocked by Edge Sentinel', { status: 403 });
        }
      }
    }

    // === CONTINUE: Serve the static asset ===
    const response = await env.ASSETS.fetch(request);

    // === HARDEN: Add security headers ===
    const newHeaders = new Headers(response.headers);
    newHeaders.set('X-Frame-Options', 'DENY');
    newHeaders.set('X-Content-Type-Options', 'nosniff');
    newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    newHeaders.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com");
    newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
};