/**
 * Shared unlock API logic for Cloudflare Pages Functions and Astro dev middleware.
 */

const COOKIE_MAX_AGE = 60 * 60 * 24;

export function createUnlockHandler(manifest) {
  const data = manifest ?? {};

  function json(body, status = 200, extraHeaders = {}) {
    return new Response(JSON.stringify(body), {
      status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        ...extraHeaders,
      },
    });
  }

  function cookieName(slug) {
    return `pc_${slug}`;
  }

  function getCookie(request, name) {
    const header = request.headers.get('Cookie');
    if (!header) return null;
    for (const part of header.split(';')) {
      const [k, ...rest] = part.trim().split('=');
      if (k === name) return decodeURIComponent(rest.join('='));
    }
    return null;
  }

  async function hmacSign(message, secret) {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );
    const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
    const bytes = new Uint8Array(sig);
    let binary = '';
    for (const b of bytes) binary += String.fromCharCode(b);
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  async function createToken(slug, secret) {
    const exp = Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE;
    const payload = `${slug}:${exp}`;
    const sig = await hmacSign(payload, secret);
    return `${exp}.${sig}`;
  }

  async function verifyToken(slug, token, secret) {
    const [expStr, sig] = token.split('.');
    if (!expStr || !sig) return false;
    const exp = Number(expStr);
    if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
    const payload = `${slug}:${exp}`;
    const expected = await hmacSign(payload, secret);
    return sig === expected;
  }

  function buildSetCookie(slug, token) {
    const name = cookieName(slug);
    return [
      `${name}=${encodeURIComponent(token)}`,
      'Path=/',
      `Max-Age=${COOKIE_MAX_AGE}`,
      'HttpOnly',
      'SameSite=Strict',
    ].join('; ');
  }

  function getEntry(slug) {
    if (!slug || !data[slug]) return null;
    return data[slug];
  }

  function respondUnlocked(slug, extraHeaders = {}) {
    const entry = getEntry(slug);
    return json(
      { unlocked: true, title: entry.title, html: entry.html },
      200,
      extraHeaders,
    );
  }

  return async function handleUnlockRequest(request, env) {
    const method = request.method.toUpperCase();

    if (method === 'GET') {
      const slug = new URL(request.url).searchParams.get('slug')?.trim();
      const entry = getEntry(slug);
      if (!entry) return json({ error: '找不到此內容' }, 404);

      const secret = env.PROTECTED_COOKIE_SECRET ?? env.PROTECTED_POST_PASSWORD;
      if (!secret) return json({ error: '伺服器未設定密碼' }, 503);

      const token = getCookie(request, cookieName(slug));
      if (!token || !(await verifyToken(slug, token, secret))) {
        return json({ unlocked: false }, 401);
      }

      return respondUnlocked(slug);
    }

    if (method === 'POST') {
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: '無效的請求' }, 400);
      }

      const slug = body.slug?.trim();
      const entry = getEntry(slug);
      if (!entry) return json({ error: '找不到此內容' }, 404);

      const expected = env.PROTECTED_POST_PASSWORD;
      if (!expected) return json({ error: '伺服器未設定密碼' }, 503);

      if ((body.password ?? '') !== expected) {
        return json({ error: '密碼錯誤' }, 401);
      }

      const secret = env.PROTECTED_COOKIE_SECRET ?? expected;
      const token = await createToken(slug, secret);

      return respondUnlocked(slug, {
        'Set-Cookie': buildSetCookie(slug, token),
      });
    }

    return json({ error: 'Method not allowed' }, 405);
  };
}
