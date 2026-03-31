import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DeleteMyEventButton } from '@/components/modules/Dashboard/MyEventActionButtons';
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

type MyEventDetailsPageProps = {
  params: Promise<{ eventId: string }>;
};

const MyEventDetailsPage = async ({ params }: MyEventDetailsPageProps) => {
  const { eventId } = await params;

  let event = asRecord({});
  let participants = [] as unknown[];

  try {
    const [eventResponse, participantsResponse] = await Promise.all([
      platformServerServices.getEventById(eventId),
      platformServerServices.getEventParticipants(eventId),
    ]);
    event = asRecord(eventResponse.data);
    participants = extractArrayPayload(participantsResponse.data);
  } catch {
    return (
      <main className="min-h-screen bg-[#f7f8fc] p-4 sm:p-6 lg:p-8">
        <section className="mx-auto w-full max-w-3xl rounded-3xl border border-rose-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-black text-slate-900">
            Unable to Load Event
          </h1>
          <p className="mt-2 text-slate-600">
            This event may be unavailable or inaccessible.
          </p>
          <Button
            asChild
            className="mt-5 bg-[#101b3d] text-white hover:bg-[#1a2f66]"
          >
            <Link href="/dashboard/my-events">Back to My Events</Link>
          </Button>
        </section>
      </main>
    );
  }

  const count = asRecord(event._count);
  const pendingParticipants = participants.filter(item => {
    const participant = asRecord(item);
    return pickString(participant.status).toUpperCase() === 'PENDING';
  }).length;

  return (
    <main className="min-h-screen bg-[#f7f8fc] p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-6xl space-y-6">
        <header className="rounded-3xl bg-[#101b3d] p-7 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
            My Events
          </p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            {pickString(event.title, 'Event Details')}
          </h1>
          <p className="mt-3 text-slate-200">
            {pickString(event.description, 'No description')}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              asChild
              variant="outline"
              className="border-slate-500 bg-transparent text-slate-100 hover:bg-slate-800"
            >
              <Link href={`/dashboard/my-events/edit-event?eventId=${eventId}`}>
                Edit Event
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-slate-500 bg-transparent text-slate-100 hover:bg-slate-800"
            >
              <Link
                href={`/dashboard/my-events/participants?eventId=${eventId}`}
              >
                Manage Participants
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-slate-500 bg-transparent text-slate-100 hover:bg-slate-800"
            >
              <Link
                href={`/dashboard/my-events/invitations?eventId=${eventId}`}
              >
                Add Participant
              </Link>
            </Button>
            <DeleteMyEventButton eventId={eventId} />
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">Participants</p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              {pickNumber(count.participants, 0)}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">Pending Requests</p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              {pendingParticipants}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">Reviews</p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              {pickNumber(count.reviews, 0)}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">Invitations</p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              {pickNumber(count.eventInvitations, 0)}
            </p>
          </article>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Event Information
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
            <p className="rounded-lg bg-slate-50 p-3">
              Visibility: {pickString(event.visibility)}
            </p>
            <p className="rounded-lg bg-slate-50 p-3">
              Fee Type: {pickString(event.feeType)}
            </p>
            <p className="rounded-lg bg-slate-50 p-3">
              Registration Fee:{' '}
              {pickNumber(event.registrationFee, 0) > 0
                ? `৳${pickNumber(event.registrationFee, 0)}`
                : 'Free'}
            </p>
            <p className="rounded-lg bg-slate-50 p-3">
              Venue: {pickString(event.venue, 'N/A')}
            </p>
          </div>
        </section>
      </section>
    </main>
  );
};

export default MyEventDetailsPage;
