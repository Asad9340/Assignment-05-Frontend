import { CalendarDays, Clock3, Link2, MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { extractArrayPayload, mapEvent, mapReview } from '@/lib/apiMappers';
import { platformServices } from '@/services/platform.services';

type EventDetailsPageProps = {
  params: Promise<{ eventId: string }>;
};

const EventDetailsPage = async ({ params }: EventDetailsPageProps) => {
  const { eventId } = await params;

  let event = mapEvent({});
  let reviews = [] as ReturnType<typeof mapReview>[];
  let isError = false;

  try {
    const [eventResponse, reviewsResponse] = await Promise.all([
      platformServices.getEventById(eventId),
      platformServices.getEventReviews(eventId),
    ]);

    event = mapEvent(eventResponse.data);
    reviews = extractArrayPayload(reviewsResponse.data).map(item =>
      mapReview(item),
    );
  } catch {
    isError = true;
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : '0.0';

  const actionLabel =
    event.visibility.toUpperCase() === 'PRIVATE'
      ? event.feeType.toUpperCase() === 'PAID'
        ? 'Pay & Request'
        : 'Request to Join'
      : event.feeType.toUpperCase() === 'PAID'
        ? 'Pay & Join'
        : 'Join';

  return (
    <main className="min-h-screen bg-[#f7f8fc] py-14 sm:py-20">
      {isError ? (
        <section className="mx-auto mb-5 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-700">
            Unable to load event details at this moment.
          </div>
        </section>
      ) : null}

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <article className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-sky-100 text-sky-700">
              {event.visibility}
            </Badge>
            <Badge
              className={
                event.feeType.toUpperCase() === 'PAID'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-emerald-100 text-emerald-700'
              }
            >
              {event.feeType}
            </Badge>
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
            {event.title}
          </h1>
          <p className="mt-4 text-slate-600">{event.description}</p>

          <div className="mt-7 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
            <p className="flex items-center gap-2 rounded-xl bg-slate-50 p-3">
              <CalendarDays className="size-4" />
              Date: {event.eventDate || 'TBD'}
            </p>
            <p className="flex items-center gap-2 rounded-xl bg-slate-50 p-3">
              <Clock3 className="size-4" />
              Time: {event.eventTime || 'TBD'}
            </p>
            <p className="flex items-center gap-2 rounded-xl bg-slate-50 p-3">
              <MapPin className="size-4" />
              Venue: {event.venue}
            </p>
            <p className="flex items-center gap-2 rounded-xl bg-slate-50 p-3">
              <Link2 className="size-4" />
              Organizer: {event.organizerName}
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 p-5">
            <h2 className="text-lg font-bold text-slate-900">
              Reviews & Ratings
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Participants can rate, write, edit, and delete reviews within the
              review window.
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-amber-600">
              <Star className="size-4 fill-amber-500 text-amber-500" />
              Average Rating: {averageRating} / 5 ({reviews.length} reviews)
            </p>

            <div className="mt-4 space-y-2 text-sm text-slate-700">
              {reviews.slice(0, 3).map(review => (
                <p key={review.id} className="rounded-lg bg-slate-50 p-3">
                  <span className="font-semibold">{review.userName}:</span>{' '}
                  {review.review}
                </p>
              ))}
            </div>
          </div>
        </article>

        <aside className="space-y-5">
          <div className="rounded-3xl bg-[#101b3d] p-6 text-white shadow-xl">
            <h2 className="text-xl font-bold">Registration Fee</h2>
            <p className="mt-2 text-3xl font-black">
              {event.registrationFee === 0
                ? 'Free'
                : `$${event.registrationFee}`}
            </p>
            <p className="mt-3 text-sm text-slate-200">
              Paid join attempts become pending until host approval.
            </p>
            <div className="mt-6 grid gap-2">
              <Button className="bg-orange-500 text-white hover:bg-orange-400">
                {actionLabel}
              </Button>
              <Button
                variant="outline"
                className="border-slate-400 bg-transparent text-slate-100 hover:bg-slate-800"
              >
                View Participation Rules
              </Button>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Owner Controls</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>Approve or reject join requests</li>
              <li>Ban participants</li>
              <li>Edit event details</li>
              <li>Delete inappropriate/obsolete event</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default EventDetailsPage;
