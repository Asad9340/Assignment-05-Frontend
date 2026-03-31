import Link from 'next/link';
import { CalendarDays, Clock3, MapPin, UserRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HomeEvent } from './home-data';

type HomeUpcomingEventsSectionProps = {
  events?: HomeEvent[];
};

const HomeUpcomingEventsSection = ({
  events = [],
}: HomeUpcomingEventsSectionProps) => {
  return (
    <section className="bg-[#f7f8fc] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Upcoming Public Events
            </h2>
            <p className="mt-2 text-slate-600">
              Discover live upcoming events fetched from backend.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
          >
            <Link href="/events">See All Events</Link>
          </Button>
        </div>

        {events.length === 0 && (
          <p className="text-center text-slate-500 py-12">
            No upcoming events at the moment. Check back soon!
          </p>
        )}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {events.map(event => (
            <article
              key={event.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge
                  className={
                    event.visibility === 'Private'
                      ? 'bg-violet-100 text-violet-700'
                      : 'bg-sky-100 text-sky-700'
                  }
                >
                  {event.visibility}
                </Badge>
                <Badge
                  className={
                    event.feeType === 'Free'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }
                >
                  {event.feeType}
                </Badge>
              </div>

              <h3 className="line-clamp-2 min-h-12 text-lg font-bold text-slate-900">
                {event.title}
              </h3>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  {event.date}
                </p>
                {event.time && (
                  <p className="flex items-center gap-2">
                    <Clock3 className="size-4" />
                    {event.time}
                  </p>
                )}
                {event.venue && (
                  <p className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    {event.venue}
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <UserRound className="size-4" />
                  {event.organizer}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <p className="font-semibold text-slate-900">
                  {event.fee === 0 ? 'Free' : `৳${event.fee}`}
                </p>
                <Button
                  asChild
                  size="sm"
                  className="bg-slate-900 text-white hover:bg-slate-700 group-hover:bg-[#101b3d]"
                >
                  <Link href={`/events/${event.id}`}>View Details</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeUpcomingEventsSection;
