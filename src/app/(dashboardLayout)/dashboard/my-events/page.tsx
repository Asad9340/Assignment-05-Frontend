import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DeleteMyEventButton,
  UpdateMyEventStatusButtons,
} from '@/components/modules/Dashboard/MyEventActionButtons';
import { extractArrayPayload, mapEvent } from '@/lib/apiMappers';
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

const pickString = (value: unknown, fallback = ''): string => {
  return typeof value === 'string' ? value : fallback;
};

const MyEventsPage = async () => {
  let events = [] as ReturnType<typeof mapEvent>[];
  let statusSummary = {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    joined: 0,
    banned: 0,
    recentPending: [] as unknown[],
  };

  try {
    const [
      eventsResponse,
      fallbackEventsResponse,
      summaryResponse,
      approvalsResponse,
    ] = await Promise.allSettled([
      platformServerServices.getMyEvents(),
      platformServerServices.getDashboardMyEvents(),
      platformServerServices.getMyEventStatusSummary(),
      platformServerServices.getDashboardPendingApprovals(),
    ]);

    if (eventsResponse.status === 'fulfilled') {
      events = extractArrayPayload(eventsResponse.value.data).map(item =>
        mapEvent(item),
      );
    } else if (fallbackEventsResponse.status === 'fulfilled') {
      events = extractArrayPayload(fallbackEventsResponse.value.data).map(
        item => mapEvent(item),
      );
    }

    if (summaryResponse.status === 'fulfilled') {
      const summaryPayload = asRecord(summaryResponse.value.data);

      statusSummary = {
        total: pickNumber(summaryPayload.total),
        pending: pickNumber(summaryPayload.pending),
        approved: pickNumber(summaryPayload.approved),
        rejected: pickNumber(summaryPayload.rejected),
        joined: pickNumber(summaryPayload.joined),
        banned: pickNumber(summaryPayload.banned),
        recentPending: Array.isArray(summaryPayload.recentPending)
          ? summaryPayload.recentPending
          : [],
      };
    }

    if (approvalsResponse.status === 'fulfilled') {
      const fallbackApprovalsCount = extractArrayPayload(
        approvalsResponse.value.data,
      ).length;

      if (!statusSummary.pending && fallbackApprovalsCount) {
        statusSummary.pending = fallbackApprovalsCount;
      }

      if (
        statusSummary.recentPending.length === 0 &&
        fallbackApprovalsCount > 0
      ) {
        statusSummary.recentPending = extractArrayPayload(
          approvalsResponse.value.data,
        ).slice(0, 8);
      }
    }

    statusSummary.total =
      statusSummary.pending +
      statusSummary.approved +
      statusSummary.rejected +
      statusSummary.joined +
      statusSummary.banned;
  } catch {
    // all API calls are already handled in allSettled; this catch is a hard fallback
  }

  const paidEvents = events.filter(
    event => event.feeType.toUpperCase() === 'PAID',
  ).length;

  return (
    <main className="min-h-screen bg-[#f7f8fc] p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-7xl space-y-6">
        <header className="rounded-3xl bg-[#101b3d] p-7 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">My Events</h1>
          <p className="mt-3 max-w-3xl text-slate-200">
            Create, update, and moderate events from one workspace.
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
              <Link href="/dashboard/my-events/approvals">Approval Queue</Link>
            </Button>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">Total Events</p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              {events.length}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">Paid Events</p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              {paidEvents}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">Free Events</p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              {events.length - paidEvents}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">Total Participants</p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              {events.reduce(
                (sum, event) => sum + (event.totalParticipants || 0),
                0,
              )}
            </p>
          </article>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-900">
              Update Event Status
            </h2>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href="/dashboard/my-events/approvals">
                  Open Approval Queue
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/dashboard/my-events/participants">
                  Open Participants
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Pending Requests
              </p>
              <p className="mt-1 text-2xl font-black text-amber-600">
                {statusSummary.pending}
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Approved
              </p>
              <p className="mt-1 text-2xl font-black text-emerald-600">
                {statusSummary.approved}
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Rejected
              </p>
              <p className="mt-1 text-2xl font-black text-rose-500">
                {statusSummary.rejected}
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Joined
              </p>
              <p className="mt-1 text-2xl font-black text-cyan-700">
                {statusSummary.joined}
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Banned
              </p>
              <p className="mt-1 text-2xl font-black text-rose-700">
                {statusSummary.banned}
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Total Moderated
              </p>
              <p className="mt-1 text-2xl font-black text-slate-900">
                {statusSummary.total}
              </p>
            </article>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-sm font-semibold text-slate-700">
              Latest Join Requests
            </p>
            {statusSummary.recentPending.length === 0 ? (
              <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                No pending join requests right now.
              </p>
            ) : (
              statusSummary.recentPending.map(item => {
                const participant = asRecord(item);
                const user = asRecord(participant.user);
                const event = asRecord(participant.event);

                return (
                  <article
                    key={pickString(participant.id)}
                    className="rounded-xl border border-slate-200 p-3"
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      {pickString(user.name, 'Unknown user')} -{' '}
                      {pickString(event.title, 'Untitled event')}
                    </p>
                    <p className="text-xs text-slate-600">
                      {pickString(user.email, 'N/A')}
                    </p>
                  </article>
                );
              })
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-900">Event List</h2>
            <Button asChild variant="outline">
              <Link href="/dashboard/my-events/create-event">Add New</Link>
            </Button>
          </div>

          <div className="space-y-4">
            {events.map(event => (
              <article
                key={event.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50/60 to-sky-50/50 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400" />

                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold tracking-wide text-white">
                        {event.status || 'ACTIVE'}
                      </span>
                      <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                        {event.visibility}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          event.feeType.toUpperCase() === 'PAID'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {event.feeType}
                      </span>
                    </div>

                    <h3 className="truncate text-2xl font-semibold text-slate-900">
                      {event.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-slate-700">
                      {event.eventDate} at {event.eventTime || 'TBD'}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Fee:{' '}
                      {event.registrationFee > 0
                        ? `BDT ${event.registrationFee}`
                        : 'Free'}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    <UpdateMyEventStatusButtons
                      eventId={event.id}
                      currentStatus={event.status}
                    />
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/dashboard/my-events/${event.id}`}>
                        Details
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href={`/dashboard/my-events/edit-event?eventId=${event.id}`}
                      >
                        Edit
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link
                        href={`/dashboard/my-events/participants?eventId=${event.id}`}
                      >
                        Participants
                      </Link>
                    </Button>
                    <DeleteMyEventButton eventId={event.id} />
                  </div>
                </div>
              </article>
            ))}

            {events.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <p className="text-sm text-slate-600">
                  You have not created any event yet.
                </p>
                <Button
                  asChild
                  className="mt-4 bg-[#101b3d] text-white hover:bg-[#172958]"
                >
                  <Link href="/dashboard/my-events/create-event">
                    Create Your First Event
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>
        </section>
      </section>
    </main>
  );
};

export default MyEventsPage;
