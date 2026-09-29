// worker/index.js

const TTP_RULES = [
  { name: 'SQL Injection', pattern: /(union\s+(all\s+)?select|'\s*or\s*'|;\s*drop)/i, severity: 'high', technique: 'T1190' },
  { name: 'Path Traversal', pattern: /(\.\.\/|\.\.\\|%2e%2e)/i, severity: 'medium', technique: 'T1083' },
  { name: 'Scanner UA',     pattern: /(sqlmap|nikto|nmap)/i,                  severity: 'low',    technique: 'T1595' }
];

// Single source of truth for response hardening (keep public/_headers + src/middleware.ts in sync)
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests"
].join('; ');

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': CSP,
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin'
};

function harden(response) {
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) headers.set(k, v);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

// Decode repeatedly so %2527 / %20 style encodings can't sidestep the rules
function normalize(raw) {
  let s = raw;
  for (let i = 0; i < 3; i++) {
    try {
      const d = decodeURIComponent(s.replace(/\+/g, ' '));
      if (d === s) break;
      s = d;
    } catch { break; }
  }
  return s.toLowerCase();
}

export default {
  async fetch(request, env, ctx) {
    const rawUrl = request.url.toLowerCase();
    const url = normalize(request.url);
    const ua  = (request.headers.get('User-Agent') || '').toLowerCase();

    // === DETECTION: Check for suspicious patterns ===
    for (const rule of TTP_RULES) {
      const matched = rule.name === 'Scanner UA'
        ? rule.pattern.test(ua)
        : rule.pattern.test(url) || rule.pattern.test(rawUrl);
      if (matched) {
        console.log('SECURITY_ALERT:', JSON.stringify({
          rule: rule.name,
          severity: rule.severity,
          technique: rule.technique,
          uri: request.url,
          ip: request.headers.get('cf-connecting-ip'),
          timestamp: new Date().toISOString()
        }));

        if (rule.severity === 'high') {
          return harden(new Response('Blocked by Edge Sentinel', {
            status: 403,
            headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
          }));
        }
      }
    }

    // === CONTINUE: Serve the static asset ===
    const response = await env.ASSETS.fetch(request);

    // === HARDEN: Add security headers ===
    return harden(response);
  }
};
