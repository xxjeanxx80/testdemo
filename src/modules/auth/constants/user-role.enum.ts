export enum UserRole {
  CUSTOMER = 'customer',
  OWNER = 'owner',
  ADMIN = 'admin',
}

export const DEFAULT_ROLE = UserRole.CUSTOMER;

export const ROLE_DASHBOARD_ROUTE: Record<UserRole, string> = {
  [UserRole.CUSTOMER]: '/customer/dashboard',
  [UserRole.OWNER]: '/owner/dashboard',
  [UserRole.ADMIN]: '/admin/dashboard',
};
