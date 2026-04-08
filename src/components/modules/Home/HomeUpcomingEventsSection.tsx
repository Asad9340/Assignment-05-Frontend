import Link from 'next/link';
import Image from 'next/image';
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
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Upcoming Public Events
            </h2>
            <p className="mt-2 text-muted-foreground">
              Discover handpicked upcoming experiences across communities.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-border bg-card text-foreground hover:bg-muted"
          >
            <Link href="/events">See All Events</Link>
          </Button>
        </div>

        {events.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No upcoming events at the moment. Check back soon!
          </p>
        )}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <article
              key={event.id}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {event.image ? (
                <div className="mb-4 overflow-hidden rounded-xl border border-border">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={640}
                    height={320}
                    className="h-40 w-full object-cover"
                  />
                </div>
              ) : null}

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

              <h3 className="line-clamp-2 min-h-12 text-lg font-bold text-foreground">
                {event.title}
              </h3>

              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
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
                <p className="font-semibold text-foreground">
                  {event.fee === 0 ? 'Free' : `৳${event.fee}`}
                </p>
                <Button
                  asChild
                  size="sm"
                  className="bg-primary text-white hover:bg-primary/90 group-hover:bg-primary"
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
