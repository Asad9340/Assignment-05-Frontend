import { CalendarCheck2, CreditCard, UserCheck } from 'lucide-react';

const steps = [
  {
    title: 'Discover or Create',
    description:
      'Browse public events or create private experiences with complete control.',
    icon: CalendarCheck2,
  },
  {
    title: 'Invite and Approve',
    description:
      'Manage invitations and participant approvals with a clear status workflow.',
    icon: UserCheck,
  },
  {
    title: 'Pay and Participate',
    description:
      'Handle paid registrations securely while keeping free events frictionless.',
    icon: CreditCard,
  },
];

const HomeHowItWorksSection = () => {
  return (
    <section className="bg-card py-14 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground">How Planora Works</h2>
        <p className="mt-2 text-muted-foreground">
          A simple three-step flow from event discovery to participation.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map(step => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className="rounded-2xl border border-border bg-muted p-6"
              >
                <span className="inline-flex rounded-xl bg-primary p-2 text-white">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeHowItWorksSection;
