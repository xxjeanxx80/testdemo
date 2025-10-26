import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

type Locale = 'en' | 'vi';

type Dictionary = Record<string, Record<Locale, string>>;

const dictionary: Dictionary = {
  greeting: {
    en: 'Xin chào từ Beauty Booking Hub',
    vi: 'Xin chào từ Beauty Booking Hub',
  },
  loginWith: {
    en: 'Continue with',
    vi: 'Đăng nhập bằng',
  },
  customerDashboard: {
    en: 'Customer Dashboard',
    vi: 'Trang khách hàng',
  },
  ownerDashboard: {
    en: 'Spa Owner Dashboard',
    vi: 'Trang chủ Spa',
  },
  adminDashboard: {
    en: 'Admin Dashboard',
    vi: 'Trang quản trị',
  },
  loyaltyPoints: {
    en: 'Loyalty points',
    vi: 'Điểm thân thiết',
  },
  logout: {
    en: 'Sign out',
    vi: 'Đăng xuất',
  },
};

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof typeof dictionary) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale,
    t: (key) => dictionary[key][locale] ?? key,
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
