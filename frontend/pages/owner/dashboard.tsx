import { withProtectedRoute } from '../../components/ProtectedRoute';
import { clearAccessToken, Role } from '../../lib/auth';
import { useI18n } from '../../lib/i18n';

function OwnerDashboard({ userRole }: { userRole: Role }) {
  const { t } = useI18n();

  const handleSignOut = () => {
    clearAccessToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between bg-indigo-700 px-8 py-4 text-white">
        <h1 className="text-xl font-semibold">{t('ownerDashboard')}</h1>
        <button className="rounded bg-indigo-500 px-3 py-1 text-sm" onClick={handleSignOut}>
          {t('logout')}
        </button>
      </header>
      <section className="mx-auto flex max-w-4xl flex-col gap-6 px-8 py-12">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-indigo-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-indigo-700">Today's bookings</h2>
            <ul className="text-sm text-slate-600">
              <li>08:30 • Facial • Linh Customer</li>
              <li>10:00 • Massage • Guest walk-in</li>
            </ul>
          </article>
          <article className="rounded-lg border border-indigo-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-indigo-700">Pending approvals</h2>
            <p className="text-sm text-slate-600">2 new therapists awaiting verification.</p>
          </article>
        </div>
        <p className="text-xs text-slate-400">Active role: {userRole}</p>
      </section>
    </main>
  );
}

export default withProtectedRoute(OwnerDashboard, ['owner']);
