import Link from 'next/link';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { featuredEvent, HomeEvent } from './home-data';

type HomeHeroSectionProps = {
  event?: HomeEvent;
};

const HomeHeroSection = ({ event = featuredEvent }: HomeHeroSectionProps) => {
  const feeLabel = event.fee === 0 ? 'Free' : `$${event.fee}`;
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0b1329]">
      <div className="absolute -left-24 top-8 size-72 rounded-full bg-orange-400/20 blur-3xl" />
      <div className="absolute right-0 top-0 size-80 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <Badge className="rounded-full bg-orange-500/20 px-3 py-1 text-orange-200">
            Featured Event
          </Badge>
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
            Build, Host, and Join Exceptional Events with Planora
          </h1>
          <p className="max-w-xl text-base text-slate-300 sm:text-lg">
            A secure platform for managing public and private events with smooth
            registration, invite workflows, and integrated payments.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-orange-500 text-white hover:bg-orange-400"
            >
              <Link href="/events">
                Join This Event <ArrowRight className="size-4" />
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

        <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">{event.title}</h2>
            <Badge
              className={
                event.feeType === 'Free'
                  ? 'bg-emerald-500/20 text-emerald-200'
                  : 'bg-amber-500/20 text-amber-200'
              }
            >
              {event.feeType}
            </Badge>
          </div>
          <p className="mb-5 text-sm text-slate-300">
            Join top creators, developers, and community leaders for a full-day
            summit focused on event growth, monetization, and engagement.
          </p>
          <div className="space-y-3 text-sm text-slate-200">
            <p className="flex items-center gap-2">
              <Calendar className="size-4 text-orange-300" />
              {event.date}
            </p>
            <p className="flex items-center gap-2">
              <Users className="size-4 text-sky-300" />
              Organizer: {event.organizer}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-lg font-semibold text-white">{feeLabel}</p>
            <Button
              asChild
              className="bg-white text-slate-900 hover:bg-slate-200"
            >
              <Link href={`/events/${event.id}`}>View Details</Link>
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
};

export default HomeHeroSection;
