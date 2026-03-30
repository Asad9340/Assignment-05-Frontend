import Link from 'next/link';
import { Button } from '@/components/ui/button';
import StaticPageShell from '@/components/modules/Dashboard/StaticPageShell';
import { extractArrayPayload, mapParticipation } from '@/lib/apiMappers';
import { platformServerServices } from '@/services/platform.server.services';

const JoinedEventsPage = async () => {
  let joinedParticipations = [] as ReturnType<typeof mapParticipation>[];

  try {
    const response = await platformServerServices.getMyParticipations({
      status: 'JOINED',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      limit: 100,
    });

    const allRows = extractArrayPayload(response.data).map(item =>
      mapParticipation(item),
    );

    joinedParticipations = allRows.filter(
      row => row.status.toUpperCase() === 'JOINED',
    );
  } catch {
    joinedParticipations = [];
  }

  return (
    <StaticPageShell
      eyebrow="Dashboard"
      title="Joined Events"
      description="View all events where your participation has been approved and marked as joined."
      metrics={[
        { label: 'Total Joined', value: String(joinedParticipations.length) },
      ]}
    >
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">My Joined Events</h2>
        <p className="mt-2 text-sm text-slate-600">
          These are events you can actively participate in right now.
        </p>

        {joinedParticipations.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-600">
            You have not joined any events yet.
            <div className="mt-4">
              <Button
                asChild
                className="bg-[#101b3d] text-white hover:bg-[#172958]"
              >
                <Link href="/events">Browse Events</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {joinedParticipations.map(item => (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  Joined
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">
                  {item.eventTitle}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Payment: {item.paymentStatus}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Event Status: {item.eventStatus || 'ACTIVE'}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button asChild variant="outline">
                    <Link href={`/events/${item.eventId}`}>View Event</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </StaticPageShell>
  );
};

export default JoinedEventsPage;
