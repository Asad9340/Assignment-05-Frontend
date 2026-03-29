import Link from 'next/link';
import { CalendarDays, UserRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HomeEvent, upcomingPublicEvents } from './home-data';

type HomeUpcomingEventsSectionProps = {
  events?: HomeEvent[];
};

const HomeUpcomingEventsSection = ({
  events = upcomingPublicEvents,
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
              Discover 9 curated events you can join right now.
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

        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3">
          {events.map(event => (
            <article
              key={event.id}
              className="min-w-70 snap-start rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <Badge className="bg-sky-100 text-sky-700">Public</Badge>
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

              <h3 className="line-clamp-2 min-h-12 text-lg font-semibold text-slate-900">
                {event.title}
              </h3>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  {event.date}
                </p>
                <p className="flex items-center gap-2">
                  <UserRound className="size-4" />
                  {event.organizer}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <p className="font-semibold text-slate-900">
                  {event.fee === 0 ? 'Free' : `$${event.fee}`}
                </p>
                <Button
                  asChild
                  size="sm"
                  className="bg-slate-900 text-white hover:bg-slate-700"
                >
                  <Link href={`/events/${event.id}`}>View</Link>
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
