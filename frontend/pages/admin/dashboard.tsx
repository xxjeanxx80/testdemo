import { withProtectedRoute } from '../../components/ProtectedRoute';
import { clearAccessToken, Role } from '../../lib/auth';
import { useI18n } from '../../lib/i18n';

function AdminDashboard({ userRole }: { userRole: Role }) {
  const { t } = useI18n();

  const handleSignOut = () => {
    clearAccessToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <header className="flex items-center justify-between bg-black/30 px-8 py-5 backdrop-blur">
        <h1 className="text-xl font-semibold">{t('adminDashboard')}</h1>
        <button className="rounded bg-rose-500 px-3 py-1 text-sm" onClick={handleSignOut}>
          {t('logout')}
        </button>
      </header>
      <section className="mx-auto flex max-w-4xl flex-col gap-6 px-8 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-lg border border-white/10 bg-white/10 p-6">
            <p className="text-sm uppercase text-slate-300">Total spas</p>
            <p className="text-3xl font-bold">42</p>
          </article>
          <article className="rounded-lg border border-white/10 bg-white/10 p-6">
            <p className="text-sm uppercase text-slate-300">Pending approvals</p>
            <p className="text-3xl font-bold">3</p>
          </article>
          <article className="rounded-lg border border-white/10 bg-white/10 p-6">
            <p className="text-sm uppercase text-slate-300">Flagged bookings</p>
            <p className="text-3xl font-bold">1</p>
          </article>
        </div>
        <p className="text-xs text-slate-400">Active role: {userRole}</p>
      </section>
    </main>
  );
}

export default withProtectedRoute(AdminDashboard, ['admin']);
