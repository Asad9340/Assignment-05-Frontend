import Link from 'next/link';
import { Button } from '@/components/ui/button';

const HomeCtaSection = () => {
  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
          Create Better Events. Join Smarter Communities.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/70 dark:text-muted-foreground">
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
            className="border-border bg-transparent text-primary-foreground hover:bg-primary/80 dark:text-foreground dark:hover:bg-muted"
          >
            <Link href="/events">Join Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeCtaSection;
