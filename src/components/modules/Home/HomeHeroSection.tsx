import Link from 'next/link';
import { ArrowRight, Calendar, Clock3, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HomeEvent } from './home-data';

type HomeHeroSectionProps = {
  event?: HomeEvent;
};

const HomeHeroSection = ({ event }: HomeHeroSectionProps) => {
  const feeLabel = event ? (event.fee === 0 ? 'Free' : `৳${event.fee}`) : '';

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0b1329]">
      <div className="absolute -left-24 top-8 size-72 rounded-full bg-orange-400/20 blur-3xl" />
      <div className="absolute right-0 top-0 size-80 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <Badge className="rounded-full bg-orange-500/20 px-3 py-1 text-orange-200">
            {event ? 'Featured Event' : 'Welcome to Planora'}
          </Badge>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            {event
              ? event.title
              : 'Build, Host, and Join Memorable Events with Planora'}
          </h1>
          <p className="max-w-xl text-base text-slate-300 sm:text-lg">
            {event?.description
              ? event.description
              : 'A secure platform for managing public and private events with smooth registration, invite workflows, and integrated payments.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-orange-500 text-white hover:bg-orange-400"
            >
              <Link href={event ? `/events/${event.id}` : '/events'}>
                {event ? 'View Event' : 'Browse Events'}{' '}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-slate-500 bg-transparent text-slate-100 hover:bg-slate-800"
            >
              <Link href="/dashboard/my-events/create-event">Create Event</Link>
            </Button>
          </div>
        </div>

        {event && (
          <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl backdrop-blur">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge className="bg-sky-500/20 text-sky-200">
                {event.visibility}
              </Badge>
              <Badge
                className={
                  event.feeType === 'Free'
                    ? 'bg-emerald-500/20 text-emerald-200'
                    : 'bg-amber-500/20 text-amber-200'
                }
              >
                {event.feeType}
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-200">
                {feeLabel}
              </Badge>
            </div>
            <h2 className="text-2xl font-bold text-white">{event.title}</h2>
            {event.description && (
              <p className="mb-5 line-clamp-3 text-sm text-slate-300">
                {event.description}
              </p>
            )}

            <div className="space-y-3 text-sm text-slate-200">
              <p className="flex items-center gap-2">
                <Calendar className="size-4 text-orange-300" />
                {event.date}
              </p>
              {event.time && (
                <p className="flex items-center gap-2">
                  <Clock3 className="size-4 text-indigo-300" />
                  {event.time}
                </p>
              )}
              {event.venue && (
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 text-emerald-300" />
                  {event.venue}
                </p>
              )}
              <p className="flex items-center gap-2">
                <Users className="size-4 text-sky-300" />
                Organizer: {event.organizer}
              </p>
            </div>

            {event.participantCount !== undefined && (
              <p className="flex items-center gap-2 text-sm text-slate-400">
                <Users className="size-4 text-sky-300" />
                {event.participantCount} participant
                {event.participantCount !== 1 ? 's' : ''} joined
              </p>
            )}
            <div className="mt-6 flex items-center justify-between">
              <Button
                asChild
                className="bg-white text-slate-900 hover:bg-slate-200"
              >
                <Link href={`/events/${event.id}`}>View Details</Link>
              </Button>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};

export default HomeHeroSection;
