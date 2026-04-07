import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const blogs = [
  {
    slug: 'event-planning-checklist-2026',
    title: 'Event Planning Checklist For 2026',
    summary:
      'A practical checklist covering timeline, ticketing, host communication, and post-event follow-up.',
    category: 'Guides',
  },
  {
    slug: 'increase-attendee-engagement',
    title: '7 Ways To Increase Attendee Engagement',
    summary:
      'Simple tactics for interaction before, during, and after events to improve retention and satisfaction.',
    category: 'Strategy',
  },
  {
    slug: 'private-events-best-practices',
    title: 'Private Events: Best Practices',
    summary:
      'How to handle invites, approvals, and communication for secure private community sessions.',
    category: 'Operations',
  },
];

const HomeBlogsSection = () => {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Latest Insights
            </h2>
            <p className="mt-2 text-muted-foreground">
              Tips and patterns for running better events.
            </p>
          </div>
          <Button asChild variant="outline" className="border-border bg-card">
            <Link href="/about-us">View All Articles</Link>
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {blogs.map(blog => (
            <article
              key={blog.slug}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {blog.category}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {blog.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {blog.summary}
              </p>
              <Button
                asChild
                variant="link"
                className="mt-3 h-auto p-0 text-primary"
              >
                <Link href="/about-us">
                  Read More <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBlogsSection;
