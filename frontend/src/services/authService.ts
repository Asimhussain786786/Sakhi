import { AuthUser } from '../utils/authLogic';

export interface AuthResponse {
  user: AuthUser;
  token?: string;
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || 'Authentication request failed.');
  }
  return data as T;
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user ?? null;
  } catch {
    return null;
  }
}

export async function signInWithEmail(email: string, password: string): Promise<AuthUser> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  const data = await parseJson<AuthResponse>(res);
  return data.user;
}

export async function signUpWithEmail(
  name: string,
  email: string,
  password: string,
): Promise<AuthUser> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, email, password }),
  });
  const data = await parseJson<AuthResponse>(res);
  return data.user;
}

export async function signInWithGoogle(profile?: {
  email: string;
  name: string;
}): Promise<AuthUser> {
  const res = await fetch('/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(profile ?? {}),
  });
  const data = await parseJson<AuthResponse>(res);
  return data.user;
}

export async function requestPasswordReset(email: string): Promise<string> {
  const res = await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await parseJson<{ message: string }>(res);
  return data.message;
}

export async function sendOtp(phoneOrEmail: string): Promise<{ success: boolean; demoOtp: string }> {
  try {
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination: phoneOrEmail }),
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, demoOtp: data.demoOtp || '7860' };
    }
  } catch {}
  // Standalone/Client-side demo fallback
  return { success: true, demoOtp: '7860' };
}

export async function verifyOtp(phoneOrEmail: string, code: string): Promise<AuthUser> {
  try {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination: phoneOrEmail, code }),
    });
    if (res.ok) {
      const data = await parseJson<AuthResponse>(res);
      return data.user;
    }
  } catch {}

  // Fallback demo user
  const isPhone = /^[0-9+ -]+$/.test(phoneOrEmail);
  return {
    id: 'usr_otp_verified',
    name: isPhone ? 'Sakhi Member' : phoneOrEmail.split('@')[0] || 'Sakhi Member',
    email: isPhone ? `${phoneOrEmail.replace(/[^0-9]/g, '')}@sakhi.world` : phoneOrEmail,
    provider: 'email',
    joinedAt: new Date().toISOString(),
  };
}

export async function signOutUser(): Promise<void> {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  }).catch(() => undefined);
}
