import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { DASHBOARD_ROUTE, decodeJwt, persistAccessToken, Role } from '../../lib/auth';
import { useI18n } from '../../lib/i18n';

type ProviderConfig = {
  label: string;
  provider: 'google' | 'facebook';
  providerToken: string;
};

const providerConfigs: ProviderConfig[] = [
  {
    label: 'Google • Linh (Customer)',
    provider: 'google',
    providerToken: 'customer-token',
  },
  {
    label: 'Google • Bảo (Spa Owner)',
    provider: 'google',
    providerToken: 'owner-token',
  },
  {
    label: 'Facebook • Anh (Admin)',
    provider: 'facebook',
    providerToken: 'admin-token',
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function LoginPage() {
  const router = useRouter();
  const { t, locale, setLocale } = useI18n();

  const mutation = useMutation({
    mutationFn: async (config: ProviderConfig) => {
      const response = await fetch(`${API_URL}/auth/oauth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (!response.ok) {
        throw new Error('Unable to authenticate');
      }
      return response.json() as Promise<{ accessToken: string }>;
    },
    onSuccess: (data) => {
      persistAccessToken(data.accessToken);
      const payload = decodeJwt(data.accessToken);
      const role = payload?.role as Role | undefined;
      const destination = role ? DASHBOARD_ROUTE[role] : '/customer/dashboard';
      router.replace(destination);
    },
  });

  const buttons = useMemo(
    () =>
      providerConfigs.map((config) => (
        <button
          key={config.label}
          className="rounded-md bg-emerald-600 px-4 py-2 text-white shadow hover:bg-emerald-700"
          onClick={() => mutation.mutate(config)}
          disabled={mutation.isPending}
        >
          {t('loginWith')} {config.label}
        </button>
      )),
    [mutation, t],
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-emerald-50">
      <section className="mx-auto flex max-w-xl flex-col gap-6 px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold text-emerald-900">Beauty Booking Hub</h1>
        <p className="text-slate-600">{t('greeting')}</p>
        <div className="flex justify-center gap-3">
          <button
            className={`rounded-full border px-4 py-1 text-sm ${
              locale === 'en' ? 'bg-emerald-600 text-white' : 'bg-white'
            }`}
            onClick={() => setLocale('en')}
          >
            EN
          </button>
          <button
            className={`rounded-full border px-4 py-1 text-sm ${
              locale === 'vi' ? 'bg-emerald-600 text-white' : 'bg-white'
            }`}
            onClick={() => setLocale('vi')}
          >
            VI
          </button>
        </div>
        <div className="flex flex-col gap-4">{buttons}</div>
        {mutation.isError && (
          <span className="text-sm text-rose-600">{(mutation.error as Error).message}</span>
        )}
      </section>
    </main>
  );
}
