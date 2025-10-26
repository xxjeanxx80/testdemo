import { withProtectedRoute } from '../components/ProtectedRoute';

type StorageShape = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
};

const createStorage = (): StorageShape => {
  const store = new Map<string, string>();
  return {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => {
      store.set(key, value);
    },
    removeItem: (key) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    },
  };
};

const localStorageMock = createStorage();

beforeAll(() => {
  (global as any).window = { localStorage: localStorageMock };
  (global as any).localStorage = localStorageMock;
});

const replaceMock = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: replaceMock,
    push: jest.fn(),
  }),
}));

const futureExp = () => Math.floor(Date.now() / 1000) + 3600;

const createToken = (payload: Record<string, unknown>) => {
  const base64Url = (value: Record<string, unknown>) =>
    Buffer.from(JSON.stringify(value))
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  const header = base64Url({ alg: 'HS256', typ: 'JWT' });
  const body = base64Url(payload);
  return `${header}.${body}.signature`;
};

describe('withProtectedRoute', () => {
  beforeEach(() => {
    replaceMock.mockReset();
    localStorageMock.clear();
  });

  it('redirects to login when token is missing', () => {
    const Page = withProtectedRoute(() => 'secure', ['admin']);
    const result = Page({} as any);
    expect(result).toBeNull();
    expect(replaceMock).toHaveBeenCalledWith('/auth/login');
  });

  it('redirects to dashboard when role mismatches', () => {
    const token = createToken({ role: 'customer', exp: futureExp() });
    localStorageMock.setItem('accessToken', token);
    const Page = withProtectedRoute(() => 'owner view', ['owner']);
    const result = Page({} as any);
    expect(result).toBeNull();
    expect(replaceMock).toHaveBeenCalledWith('/customer/dashboard');
  });

  it('returns wrapped component output when role matches', () => {
    const token = createToken({ role: 'admin', exp: futureExp() });
    localStorageMock.setItem('accessToken', token);
    const Page = withProtectedRoute((props: { userRole: string }) => `role:${props.userRole}`, ['admin']);
    const result = Page({} as any);
    expect(result?.props?.userRole).toEqual('admin');
    expect(typeof result?.type).toBe('function');
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
