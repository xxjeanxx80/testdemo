import { ComponentType } from 'react';
import { useRouter } from 'next/router';
import {
  Role,
  DASHBOARD_ROUTE,
  decodeJwt,
  isTokenExpired,
  readAccessToken,
  clearAccessToken,
} from '../lib/auth';

export function withProtectedRoute<P extends object>(
  WrappedComponent: ComponentType<P & { userRole: Role }>,
  allowedRoles: Role[],
) {
  const ProtectedRoute = (props: P) => {
    const router = useRouter();
    const token = readAccessToken();

    if (!token) {
      router.replace('/auth/login');
      return null;
    }

    const payload = decodeJwt(token);
    if (isTokenExpired(payload) || !payload?.role) {
      clearAccessToken();
      router.replace('/auth/login');
      return null;
    }

    if (!allowedRoles.includes(payload.role)) {
      router.replace(DASHBOARD_ROUTE[payload.role]);
      return null;
    }

    return <WrappedComponent {...(props as P)} userRole={payload.role} />;
  };

  ProtectedRoute.displayName = `withProtectedRoute(${getDisplayName(WrappedComponent)})`;
  return ProtectedRoute;
}

function getDisplayName<P>(Component: ComponentType<P>) {
  return (Component as any).displayName || Component.name || 'Component';
}
