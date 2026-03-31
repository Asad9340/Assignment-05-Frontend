import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ParticipantActionButtons } from '@/components/modules/Dashboard/MyEventActionButtons';
import { extractArrayPayload } from '@/lib/apiMappers';
import { platformServerServices } from '@/services/platform.server.services';

const asRecord = (value: unknown): Record<string, unknown> => {
  return value && typeof value === 'object'
    ? (value as Record<string, unknown>)
    : {};
};

const pickString = (value: unknown, fallback = ''): string => {
  return typeof value === 'string' ? value : fallback;
};

const MyEventApprovalsPage = async () => {
  let approvals = [] as unknown[];

  try {
    const [approvalsResponse, dashboardFallbackResponse] =
      await Promise.allSettled([
        platformServerServices.getMyPendingApprovals(),
        platformServerServices.getDashboardPendingApprovals(),
      ]);

    if (approvalsResponse.status === 'fulfilled') {
      approvals = extractArrayPayload(approvalsResponse.value.data);
    } else if (dashboardFallbackResponse.status === 'fulfilled') {
      approvals = extractArrayPayload(dashboardFallbackResponse.value.data);
    }

    const seenIds = new Set<string>();
    approvals = approvals.filter(item => {
      const participant = asRecord(item);
      const id = pickString(participant.id);

      if (!id || seenIds.has(id)) {
        return false;
      }

      seenIds.add(id);
      return true;
    });
  } catch {
    approvals = [];
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-6xl space-y-6">
        <header className="rounded-3xl bg-[#101b3d] p-7 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
            My Events
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Approval Queue
          </h1>
          <p className="mt-3 text-slate-200">
            Accept join requests, reject invalid requests, or ban participants.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-5 border-slate-500 bg-transparent text-slate-100 hover:bg-slate-800"
          >
            <Link href="/dashboard/my-events">Back to My Events</Link>
          </Button>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Pending Join Requests ({approvals.length})
          </h2>
          <div className="mt-4 space-y-3">
            {approvals.map(item => {
              const participant = asRecord(item);
              const user = asRecord(participant.user);
              const event = asRecord(participant.event);

              return (
                <article
                  key={pickString(participant.id)}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {pickString(user.name, 'Unknown user')}
                      </p>
                      <p className="text-sm text-slate-600">
                        {pickString(user.email, 'N/A')}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Event: {pickString(event.title, 'Untitled event')}
                      </p>
                    </div>
                    <ParticipantActionButtons
                      participantId={pickString(participant.id)}
                      status={pickString(participant.status)}
                    />
                  </div>
                </article>
              );
            })}

            {approvals.length === 0 ? (
              <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                No pending approvals right now.
              </p>
            ) : null}
          </div>
        </section>
      </section>
    </main>
  );
};

export default MyEventApprovalsPage;
