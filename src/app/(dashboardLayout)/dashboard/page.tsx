import Link from 'next/link';
import { CalendarDays, CreditCard, Mail, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { platformServerServices } from '@/services/platform.server.services';
import { getUserInfo } from '@/services/auth.services';

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

const quickActions = [
  {
    title: 'Create Event',
    description: 'Launch a public or private event with custom fee settings.',
    href: '/dashboard/my-events/create-event',
    icon: Sparkles,
  },
  {
    title: 'My Invitations',
    description: 'Respond to invitations and track acceptance status.',
    href: '/dashboard/invitations',
    icon: Mail,
  },
  {
    title: 'Pending Requests',
    description: 'Check paid and private requests waiting for approval.',
    href: '/dashboard/pending-invitations',
    icon: CalendarDays,
  },
  {
    title: 'My Payments',
    description: 'Review paid events and payment-related participation.',
    href: '/dashboard/my-payments',
    icon: CreditCard,
  },
];

export default async function UserDashboardPage() {
  const user = await getUserInfo();

  let summary = {
    myEventsCount: 0,
    myRequestsCount: 0,
    pendingInvitationsCount: 0,
    myReviewsCount: 0,
    pendingApprovalsCount: 0,
  };

  try {
    const response = await platformServerServices.getDashboardSummary();
    const payload = asRecord(response.data);

    summary = {
      myEventsCount: pickNumber(payload.myEventsCount),
      myRequestsCount: pickNumber(payload.myRequestsCount),
      pendingInvitationsCount: pickNumber(payload.pendingInvitationsCount),
      myReviewsCount: pickNumber(payload.myReviewsCount),
      pendingApprovalsCount: pickNumber(payload.pendingApprovalsCount),
    };
  } catch {
    // Keep fallback values so dashboard still renders.
  }

  const stats = [
    { label: 'Hosted Events', value: summary.myEventsCount },
    { label: 'My Join Requests', value: summary.myRequestsCount },
    { label: 'Pending Invitations', value: summary.pendingInvitationsCount },
    { label: 'Reviews Given', value: summary.myReviewsCount },
  ];

  return (
    <main className="space-y-6">
      <section className="rounded-3xl bg-[#101b3d] p-7 text-white sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
          Planora Workspace
        </p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          Welcome back{user?.name ? `, ${user.name}` : ''}
        </h1>
        <p className="mt-3 max-w-3xl text-slate-200">
          Manage event creation, invitations, participation requests, reviews,
          and payments from one place.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            asChild
            className="bg-orange-500 text-white hover:bg-orange-400"
          >
            <Link href="/dashboard/my-events/create-event">Create Event</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-500 bg-transparent text-slate-100 hover:bg-slate-800"
          >
            <Link href="/events">Browse Events</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(item => (
          <article
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-600">{item.label}</p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              {item.value}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        Pending approvals on your events: {summary.pendingApprovalsCount}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <Star className="size-4 text-amber-500" />
          <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <article
                key={action.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-lg bg-slate-900 p-2 text-white">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="font-semibold text-slate-900">
                    {action.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600">{action.description}</p>
                <Button
                  asChild
                  size="sm"
                  className="mt-4 bg-[#101b3d] text-white hover:bg-[#172958]"
                >
                  <Link href={action.href}>Open</Link>
                </Button>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
