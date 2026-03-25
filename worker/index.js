// worker/index.js
export default {
  async fetch(request, env) {
    // Fetch the static asset
    const response = await env.ASSETS.fetch(request);
    
    // TODO: Add your security headers and TTP detection here later
    return response;
  }
};