import { Badge } from '@/components/ui/badge';
import { Globe2, Rocket, ShieldCheck, Sparkles } from 'lucide-react';

const highlights = [
  {
    icon: Sparkles,
    title: 'Modern Event Experience',
    description:
      'A polished workflow from discovery to registration, designed for speed and clarity.',
    badge: 'UX',
  },
  {
    icon: ShieldCheck,
    title: 'Trust And Safety',
    description:
      'Role-based controls, verified actions, and secure payment integrations for confidence.',
    badge: 'Security',
  },
  {
    icon: Globe2,
    title: 'Flexible For Communities',
    description:
      'Host meetups, workshops, summits, or private invite-only sessions with consistent tooling.',
    badge: 'Scale',
  },
  {
    icon: Rocket,
    title: 'Built For Growth',
    description:
      'Analytics-ready foundations and operational features to expand events sustainably.',
    badge: 'Growth',
  },
];

const HomeHighlightsSection = () => {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Platform Highlights
            </h2>
            <p className="mt-2 text-muted-foreground">
              Why teams choose Planora for reliable event operations.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(item => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex rounded-xl bg-primary/10 p-2 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <Badge variant="outline">{item.badge}</Badge>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeHighlightsSection;
