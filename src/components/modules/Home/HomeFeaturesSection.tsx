import {
  CalendarCheck2,
  CreditCard,
  LayoutDashboard,
  Lock,
  Mail,
  ShieldCheck,
  Star,
  UserCheck,
} from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Secure Authentication',
    description:
      'JWT-based auth with refresh tokens, email OTP verification, and Google OAuth support for seamless, safe access.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    icon: Lock,
    title: 'Role-Based Access Control',
    description:
      'Separate Admin and User roles with fine-grained permissions. Admins manage all data while users control their own events.',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
  },
  {
    icon: CalendarCheck2,
    title: 'Public & Private Events',
    description:
      'Create open public events or invite-only private events with full visibility control and participant approval workflows.',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
  },
  {
    icon: CreditCard,
    title: 'Integrated Payments',
    description:
      'Secure paid event registrations powered by SSLCommerz. Free events are always frictionless — no payment required.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  {
    icon: Mail,
    title: 'Invitation Workflow',
    description:
      'Event owners can invite specific users. Invitees accept or decline with real-time status updates across all dashboards.',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
  },
  {
    icon: UserCheck,
    title: 'Participant Management',
    description:
      'Approve or reject join requests, track participation status, and manage your attendee list from one clean dashboard.',
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
  },
  {
    icon: Star,
    title: 'Reviews & Ratings',
    description:
      'Participants can leave ratings and reviews after events. Organizers build reputation through consistent quality.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    icon: LayoutDashboard,
    title: 'Powerful Dashboard',
    description:
      'A dedicated workspace for managing your events, invitations, payments, reviews, and profile — all in one place.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
];

const HomeFeaturesSection = () => {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-foreground dark:text-white sm:text-4xl">
            Everything You Need to Run Great Events
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Planora is built with the features modern event organizers and
            attendees actually need — from secure auth to payment processing.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(feature => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-border dark:border-white/10 bg-card p-5 transition dark:bg-card/5 hover:border-border dark:hover:border-white/20 hover:bg-muted dark:hover:bg-card/10"
              >
                <span className={`inline-flex rounded-xl p-2.5 ${feature.bg}`}>
                  <Icon className={`size-5 ${feature.color}`} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturesSection;
