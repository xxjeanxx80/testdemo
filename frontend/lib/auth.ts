export type Role = 'customer' | 'owner' | 'admin';

type JwtPayload = {
  exp?: number;
  role?: Role;
  email?: string;
  sub?: string;
};

const base64Decode = (value: string) => {
  if (typeof window !== 'undefined' && typeof window.atob === 'function') {
    return window.atob(value);
  }
  return Buffer.from(value, 'base64').toString('utf8');
};

export const DASHBOARD_ROUTE: Record<Role, string> = {
  customer: '/customer/dashboard',
  owner: '/owner/dashboard',
  admin: '/admin/dashboard',
};

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = base64Decode(normalized);
    return JSON.parse(json) as JwtPayload;
  } catch (error) {
    return null;
  }
}

export function isTokenExpired(payload: JwtPayload | null): boolean {
  if (!payload?.exp) {
    return true;
  }
  return payload.exp * 1000 <= Date.now();
}

export function persistAccessToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', token);
  }
}

export function readAccessToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('accessToken');
}

export function clearAccessToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
  }
}
