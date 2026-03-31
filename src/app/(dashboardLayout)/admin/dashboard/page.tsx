import Link from 'next/link';
import { CalendarDays, Shield, Star, UserRound, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUserInfo } from '@/services/auth.services';
import { platformServerServices } from '@/services/platform.server.services';

const asRecord = (value: unknown): Record<string, unknown> => {
  return value && typeof value === 'object'
    ? (value as Record<string, unknown>)
    : {};
};

const pickNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
};

export default async function AdminDashboardPage() {
  const user = await getUserInfo();

  let stats = {
    totalUsers: 0,
    totalEvents: 0,
    totalReviews: 0,
    totalParticipants: 0,
  };

  try {
    const response = await platformServerServices.getAdminStats();
    const payload = asRecord(response.data);

    stats = {
      totalUsers: pickNumber(payload.totalUsers),
      totalEvents: pickNumber(payload.totalEvents),
      totalReviews: pickNumber(payload.totalReviews),
      totalParticipants: pickNumber(payload.totalParticipants),
    };
  } catch {
    // Keep fallback values to render dashboard even on API failure.
  }

  const metrics = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users },
    { label: 'Total Events', value: stats.totalEvents, icon: CalendarDays },
    { label: 'Total Reviews', value: stats.totalReviews, icon: Star },
    {
      label: 'Total Participants',
      value: stats.totalParticipants,
      icon: UserRound,
    },
  ];

  let recentUsers = [] as unknown[];
  let recentEvents = [] as unknown[];

  try {
    const [usersResponse, eventsResponse] = await Promise.all([
      platformServerServices.getAdminUsers({ page: 1, limit: 5 }),
      platformServerServices.getAdminEvents({ page: 1, limit: 5 }),
    ]);

    const usersPayload = asRecord(usersResponse);
    const eventsPayload = asRecord(eventsResponse);

    recentUsers = Array.isArray(usersPayload.data) ? usersPayload.data : [];
    recentEvents = Array.isArray(eventsPayload.data) ? eventsPayload.data : [];
  } catch {
    recentUsers = [];
    recentEvents = [];
  }

  return (
    <main className="space-y-6">
      <section className="rounded-3xl bg-[#101b3d] p-7 text-white sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
          Planora Administration
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Admin Control Center{user?.name ? `: ${user.name}` : ''}
        </h1>
        <p className="mt-3 max-w-3xl text-slate-200">
          Monitor platform activity, moderate users and events, and keep the
          ecosystem healthy.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            asChild
            className="bg-orange-500 text-white hover:bg-orange-400"
          >
            <Link href="/admin/dashboard/users">Manage Users</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-500 bg-transparent text-slate-100 hover:bg-slate-800"
          >
            <Link href="/admin/dashboard/events">Moderate Events</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(metric => {
          const Icon = metric.icon;
          return (
            <article
              key={metric.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-slate-600">{metric.label}</p>
                <Icon className="size-4 text-slate-500" />
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {metric.value}
              </p>
            </article>
          );
        })}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Shield className="size-4 text-orange-500" />
          <h2 className="text-lg font-bold text-slate-900">Admin Shortcuts</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Button asChild variant="outline" className="justify-start">
            <Link href="/admin/dashboard/users">View User List</Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link href="/admin/dashboard/events">View Event List</Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link href="/admin/dashboard/reports">Open Reports</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Recent Users</h3>
          <div className="mt-4 space-y-2">
            {recentUsers.map(item => {
              const userPayload = asRecord(item);

              return (
                <div
                  key={String(userPayload.id)}
                  className="rounded-xl border border-slate-200 p-3"
                >
                  <p className="font-semibold text-slate-900">
                    {String(userPayload.name || 'Unnamed user')}
                  </p>
                  <p className="text-sm text-slate-600">
                    {String(userPayload.email || 'N/A')}
                  </p>
                </div>
              );
            })}
            {recentUsers.length === 0 ? (
              <p className="text-sm text-slate-500">
                No recent users available.
              </p>
            ) : null}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Recent Events</h3>
          <div className="mt-4 space-y-2">
            {recentEvents.map(item => {
              const eventPayload = asRecord(item);

              return (
                <div
                  key={String(eventPayload.id)}
                  className="rounded-xl border border-slate-200 p-3"
                >
                  <p className="font-semibold text-slate-900">
                    {String(eventPayload.title || 'Untitled event')}
                  </p>
                  <p className="text-sm text-slate-600">
                    {String(eventPayload.visibility || 'N/A')} |{' '}
                    {String(eventPayload.feeType || 'N/A')}
                  </p>
                </div>
              );
            })}
            {recentEvents.length === 0 ? (
              <p className="text-sm text-slate-500">
                No recent events available.
              </p>
            ) : null}
          </div>
        </article>
      </section>
    </main>
  );
}
