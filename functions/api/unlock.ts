import manifest from '../_data/manifest.json';

type ManifestEntry = { title: string; html: string };
type Manifest = Record<string, ManifestEntry>;

interface Env {
  PROTECTED_POST_PASSWORD: string;
  PROTECTED_COOKIE_SECRET?: string;
}

const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours
const data = manifest as Manifest;

function json(body: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}

function cookieName(slug: string) {
  return `pc_${slug}`;
}

function getCookie(request: Request, name: string): string | null {
  const header = request.headers.get('Cookie');
  if (!header) return null;
  for (const part of header.split(';')) {
    const [k, ...rest] = part.trim().split('=');
    if (k === name) return decodeURIComponent(rest.join('='));
  }
  return null;
}

async function hmacSign(message: string, secret: string): Promise<string> {
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

async function createToken(slug: string, secret: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE;
  const payload = `${slug}:${exp}`;
  const sig = await hmacSign(payload, secret);
  return `${exp}.${sig}`;
}

async function verifyToken(slug: string, token: string, secret: string): Promise<boolean> {
  const [expStr, sig] = token.split('.');
  if (!expStr || !sig) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const payload = `${slug}:${exp}`;
  const expected = await hmacSign(payload, secret);
  return sig === expected;
}

function buildSetCookie(slug: string, token: string): string {
  const name = cookieName(slug);
  const parts = [
    `${name}=${encodeURIComponent(token)}`,
    'Path=/',
    `Max-Age=${COOKIE_MAX_AGE}`,
    'HttpOnly',
    'SameSite=Strict',
  ];
  return parts.join('; ');
}

function getEntry(slug: string | null | undefined): ManifestEntry | null {
  if (!slug || !data[slug]) return null;
  return data[slug];
}

async function respondUnlocked(slug: string, env: Env, extraHeaders: Record<string, string> = {}) {
  const entry = getEntry(slug)!;
  return json({ unlocked: true, title: entry.title, html: entry.html }, 200, extraHeaders);
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const slug = new URL(context.request.url).searchParams.get('slug')?.trim();
  const entry = getEntry(slug);
  if (!entry) return json({ error: '找不到此內容' }, 404);

  const secret = context.env.PROTECTED_COOKIE_SECRET ?? context.env.PROTECTED_POST_PASSWORD;
  if (!secret) return json({ error: '伺服器未設定密碼' }, 503);

  const token = getCookie(context.request, cookieName(slug!));
  if (!token || !(await verifyToken(slug!, token, secret))) {
    return json({ unlocked: false }, 401);
  }

  return respondUnlocked(slug!, context.env);
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: { slug?: string; password?: string };
  try {
    body = await context.request.json();
  } catch {
    return json({ error: '無效的請求' }, 400);
  }

  const slug = body.slug?.trim();
  const entry = getEntry(slug);
  if (!entry) return json({ error: '找不到此內容' }, 404);

  const expected = context.env.PROTECTED_POST_PASSWORD;
  if (!expected) return json({ error: '伺服器未設定密碼' }, 503);

  if ((body.password ?? '') !== expected) {
    return json({ error: '密碼錯誤' }, 401);
  }

  const secret = context.env.PROTECTED_COOKIE_SECRET ?? expected;
  const token = await createToken(slug!, secret);

  return respondUnlocked(slug!, context.env, {
    'Set-Cookie': buildSetCookie(slug!, token),
  });
};
