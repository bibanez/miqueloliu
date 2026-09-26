const cookieName = 'decap_oauth_state';

function callbackPage(token, origin) {
  const payload = JSON.stringify(`authorization:github:success:${JSON.stringify({ token })}`).replace(/</g, '\\u003c');
  const target = JSON.stringify(origin);
  return new Response(`<!doctype html><meta charset="utf-8"><p>Autoritzant Decap…</p><script>
    const targetOrigin=${target};
    const opener=window.opener;
    if (!opener) throw new Error('Missing CMS window');
    const finish=(event)=>{
      if(event.source!==opener||event.origin!==targetOrigin)return;
      window.removeEventListener('message',finish);
      opener.postMessage(${payload},targetOrigin);
      window.close();
    };
    window.addEventListener('message',finish);
    opener.postMessage('authorizing:github',targetOrigin);
  </script>`, {
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'content-security-policy': `default-src 'none'; script-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'self'` },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cmsOrigin = env.CMS_ORIGIN;
    if (!cmsOrigin || !env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) return new Response('OAuth no està configurat', { status: 503 });
    if (url.pathname === '/auth') {
      if (url.searchParams.get('provider') && url.searchParams.get('provider') !== 'github') return new Response('OAuth provider no vàlid', { status: 400 });
      const state = crypto.randomUUID();
      const authorize = new URL('https://github.com/login/oauth/authorize');
      authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authorize.searchParams.set('redirect_uri', `${url.origin}/callback`);
      authorize.searchParams.set('scope', 'repo');
      authorize.searchParams.set('state', state);
      return new Response(null, { status: 302, headers: { location: authorize.toString(), 'set-cookie': `${cookieName}=${state}; HttpOnly; Secure; SameSite=Lax; Path=/callback; Max-Age=600`, 'cache-control': 'no-store' } });
    }
    if (url.pathname === '/callback') {
      const state = url.searchParams.get('state');
      const cookie = request.headers.get('cookie') || '';
      const expected = cookie.match(new RegExp(`(?:^|;\\s*)${cookieName}=([^;]+)`))?.[1];
      const clear = `${cookieName}=; HttpOnly; Secure; SameSite=Lax; Path=/callback; Max-Age=0`;
      if (!state || !expected || state !== expected) return new Response('Estat OAuth no vàlid', { status: 400, headers: { 'set-cookie': clear, 'cache-control': 'no-store' } });
      if (url.searchParams.has('error')) return new Response('Autorització cancel·lada', { status: 401, headers: { 'set-cookie': clear, 'cache-control': 'no-store' } });
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST', headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code: url.searchParams.get('code'), redirect_uri: `${url.origin}/callback` }),
      });
      const token = await tokenResponse.json();
      if (!tokenResponse.ok || !token.access_token) return new Response('No s’ha pogut completar l’autorització', { status: 502, headers: { 'set-cookie': clear, 'cache-control': 'no-store' } });
      const response = callbackPage(token.access_token, cmsOrigin);
      response.headers.set('set-cookie', clear);
      return response;
    }
    return new Response('No trobat', { status: 404, headers: { 'cache-control': 'no-store' } });
  },
};
