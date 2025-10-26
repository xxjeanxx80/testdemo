import Link from 'next/link';
import { withProtectedRoute } from '../../components/ProtectedRoute';
import { clearAccessToken, Role } from '../../lib/auth';
import { useI18n } from '../../lib/i18n';

function CustomerDashboard({ userRole }: { userRole: Role }) {
  const { t } = useI18n();

  const handleSignOut = () => {
    clearAccessToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <header className="flex items-center justify-between bg-emerald-700 px-8 py-4 text-white">
        <h1 className="text-xl font-semibold">{t('customerDashboard')}</h1>
        <button className="rounded bg-emerald-500 px-3 py-1 text-sm" onClick={handleSignOut}>
          {t('logout')}
        </button>
      </header>
      <section className="mx-auto flex max-w-4xl flex-col gap-6 px-8 py-12">
        <p className="text-slate-600">
          Enjoy curated spa experiences and manage your upcoming bookings.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-emerald-800">Next visit</h2>
            <p className="text-sm text-slate-500">Saturday, 10:00 AM at Serenity Spa</p>
          </article>
          <article className="rounded-lg border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-emerald-800">{t('loyaltyPoints')}</h2>
            <p className="text-sm text-slate-500">Redeemable vouchers available</p>
          </article>
        </div>
        <Link className="text-emerald-700 underline" href="/owner/dashboard">
          Switch to owner? Request upgrade →
        </Link>
        <p className="text-xs text-slate-400">Active role: {userRole}</p>
      </section>
    </main>
  );
}

export default withProtectedRoute(CustomerDashboard, ['customer']);
