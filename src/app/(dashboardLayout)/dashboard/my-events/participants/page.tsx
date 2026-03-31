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

type EventParticipantPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const EventParticipantPage = async ({
  searchParams,
}: EventParticipantPageProps) => {
  const resolvedSearchParams = (await searchParams) || {};
  const eventId =
    typeof resolvedSearchParams.eventId === 'string'
      ? resolvedSearchParams.eventId
      : '';

  if (!eventId) {
    return (
      <main className="min-h-screen bg-[#f7f8fc] p-4 sm:p-6 lg:p-8">
        <section className="mx-auto w-full max-w-3xl rounded-3xl border border-rose-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Event Not Selected
          </h1>
          <p className="mt-2 text-slate-600">
            Choose an event first to view participants.
          </p>
          <Button
            asChild
            className="mt-5 bg-[#101b3d] text-white hover:bg-[#1a2f66]"
          >
            <Link href="/dashboard/my-events">Go to My Events</Link>
          </Button>
        </section>
      </main>
    );
  }

  let participants = [] as unknown[];

  try {
    const response = await platformServerServices.getEventParticipants(eventId);
    participants = extractArrayPayload(response.data);
  } catch {
    participants = [];
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-6xl space-y-6">
        <header className="rounded-3xl bg-[#101b3d] p-7 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
            My Events
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Event Participants
          </h1>
          <p className="mt-3 text-slate-200">
            Moderate participants and control event access state.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-5 border-slate-500 bg-transparent text-slate-100 hover:bg-slate-800"
          >
            <Link href={`/dashboard/my-events/${eventId}`}>Back to Event</Link>
          </Button>
          <Button
            asChild
            className="mt-3 bg-orange-500 text-white hover:bg-orange-400"
          >
            <Link href={`/dashboard/my-events/invitations?eventId=${eventId}`}>
              Add Participant
            </Link>
          </Button>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3">
            {participants.map(item => {
              const participant = asRecord(item);
              const user = asRecord(participant.user);

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
                        Status: {pickString(participant.status, 'PENDING')} |
                        Payment: {pickString(participant.paymentStatus, 'N/A')}
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

            {participants.length === 0 ? (
              <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                No participants found for this event.
              </p>
            ) : null}
          </div>
        </section>
      </section>
    </main>
  );
};

export default EventParticipantPage;
