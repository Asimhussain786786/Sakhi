import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  provider: 'email' | 'google';
  joinedAt: string;
}

const SESSION_SECRET = process.env.SESSION_SECRET || 'sakhi-secure-session-key-2026';

function createSessionToken(userId: string): string {
  const payload = Buffer.from(
    JSON.stringify({ uid: userId, iat: Date.now() }),
    'utf8',
  ).toString('base64url');
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifySessionToken(token: string): string | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expected = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  if (sig.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return typeof parsed.uid === 'string' ? parsed.uid : null;
  } catch {
    return null;
  }
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const action = (req.query.path as string) || req.url?.split('/').pop()?.split('?')[0] || '';

  if (action === 'me' || req.method === 'GET') {
    const token = req.cookies?.sakhi_session || req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(200).json({ authenticated: false, user: null });
    }
    const uid = verifySessionToken(token);
    if (!uid) {
      return res.status(200).json({ authenticated: false, user: null });
    }
    return res.status(200).json({
      authenticated: true,
      user: {
        id: uid,
        name: 'Aria Mehta',
        email: 'aria@sakhi.world',
        provider: 'email',
        joinedAt: new Date().toISOString(),
      },
    });
  }

  if (action === 'login' || action === 'register' || action === 'google') {
    const email = String(req.body?.email || 'ananya.sharma@example.com').trim().toLowerCase();
    const name = String(req.body?.name || email.split('@')[0] || 'Ananya Sharma').trim();

    const user: StoredUser = {
      id: `usr_${crypto.randomUUID().slice(0, 8)}`,
      name,
      email,
      provider: action === 'google' ? 'google' : 'email',
      joinedAt: new Date().toISOString(),
    };

    const token = createSessionToken(user.id);
    res.setHeader(
      'Set-Cookie',
      `sakhi_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`,
    );

    return res.status(200).json({ user, token });
  }

  if (action === 'logout') {
    res.setHeader('Set-Cookie', 'sakhi_session=; Path=/; HttpOnly; Max-Age=0');
    return res.status(200).json({ ok: true });
  }

  return res.status(200).json({ ok: true });
}
