import Link from 'next/link';
import { Button } from '@/components/ui/button';

const HomeCtaSection = () => {
  return (
    <section className="bg-[#121c38] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-white sm:text-4xl">
          Create Better Events. Join Smarter Communities.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Whether you are hosting a paid summit or joining a private free
          meetup, Planora helps you manage invites, approvals, reviews, and
          payments in one workflow.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            asChild
            className="bg-orange-500 text-white hover:bg-orange-400"
          >
            <Link href="/dashboard/my-events/create-event">Create Event</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-500 bg-transparent text-slate-100 hover:bg-slate-800"
          >
            <Link href="/events">Join Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeCtaSection;
