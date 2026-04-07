import { Activity, CalendarDays, Users } from 'lucide-react';
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

const ReportsPage = async () => {
  let usersSummary = {
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    deletedUsers: 0,
  };

  let eventsSummary = {
    totalEvents: 0,
    privateEvents: 0,
    publicEvents: 0,
    paidEvents: 0,
    freeEvents: 0,
  };

  let engagementSummary = {
    totalReviews: 0,
    totalParticipants: 0,
  };

  try {
    const summaryResponse =
      await platformServerServices.getAdminReportsSummary();
    const summaryPayload = asRecord(summaryResponse.data);
    const usersPayload = asRecord(summaryPayload.users);
    const eventsPayload = asRecord(summaryPayload.events);
    const engagementPayload = asRecord(summaryPayload.engagement);

    usersSummary = {
      totalUsers: pickNumber(usersPayload.totalUsers),
      activeUsers: pickNumber(usersPayload.activeUsers),
      blockedUsers: pickNumber(usersPayload.blockedUsers),
      deletedUsers: pickNumber(usersPayload.deletedUsers),
    };

    eventsSummary = {
      totalEvents: pickNumber(eventsPayload.totalEvents),
      privateEvents: pickNumber(eventsPayload.privateEvents),
      publicEvents: pickNumber(eventsPayload.publicEvents),
      paidEvents: pickNumber(eventsPayload.paidEvents),
      freeEvents: pickNumber(eventsPayload.freeEvents),
    };

    engagementSummary = {
      totalReviews: pickNumber(engagementPayload.totalReviews),
      totalParticipants: pickNumber(engagementPayload.totalParticipants),
    };
  } catch {
    usersSummary = {
      totalUsers: 0,
      activeUsers: 0,
      blockedUsers: 0,
      deletedUsers: 0,
    };

    eventsSummary = {
      totalEvents: 0,
      privateEvents: 0,
      publicEvents: 0,
      paidEvents: 0,
      freeEvents: 0,
    };

    engagementSummary = {
      totalReviews: 0,
      totalParticipants: 0,
    };
  }

  const stats = [
    {
      title: 'Total Events',
      value: String(eventsSummary.totalEvents),
      delta: `Public/Private: ${eventsSummary.publicEvents}/${eventsSummary.privateEvents}`,
      icon: CalendarDays,
    },
    {
      title: 'Total Users',
      value: String(usersSummary.totalUsers),
      delta: `Active/Blocked: ${usersSummary.activeUsers}/${usersSummary.blockedUsers}`,
      icon: Users,
    },
    {
      title: 'Reviews and Participation',
      value: `${engagementSummary.totalReviews} / ${engagementSummary.totalParticipants}`,
      delta: `Paid/Free events: ${eventsSummary.paidEvents}/${eventsSummary.freeEvents}`,
      icon: Activity,
    },
  ];

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-7xl space-y-6">
        <header className="rounded-3xl bg-primary p-7 text-white sm:p-10">
          <h1 className="text-3xl font-bold sm:text-4xl">Admin Reports</h1>
          <p className="mt-2 text-primary-foreground/80">
            API-backed moderation and growth metrics for users, events, and
            engagement.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <article
                key={stat.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <span className="rounded-lg bg-muted p-2 text-muted-foreground">
                    <Icon className="size-4" />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-emerald-600">
                  {stat.delta}
                </p>
              </article>
            );
          })}
        </div>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground">
            Moderation Snapshot
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-140 text-left text-sm">
              <thead className="text-muted-foreground">
                <tr>
                  <th className="py-2">Category</th>
                  <th className="py-2">Count</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="py-3">Total Participants</td>
                  <td className="py-3">
                    {engagementSummary.totalParticipants}
                  </td>
                  <td className="py-3 text-amber-600">
                    Track approvals in event workspace
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-3">Blocked Users</td>
                  <td className="py-3">{usersSummary.blockedUsers}</td>
                  <td className="py-3 text-rose-600">
                    Monitor for abuse patterns
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-3">Private/Paid Events</td>
                  <td className="py-3">
                    {eventsSummary.privateEvents} / {eventsSummary.paidEvents}
                  </td>
                  <td className="py-3 text-emerald-600">
                    Visibility and monetization mix
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="py-3">Deleted Users</td>
                  <td className="py-3">{usersSummary.deletedUsers}</td>
                  <td className="py-3 text-muted-foreground">
                    Historical moderation count
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
};

export default ReportsPage;
