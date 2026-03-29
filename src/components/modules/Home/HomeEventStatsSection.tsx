import { HomeEvent } from './home-data';

type HomeEventStatsSectionProps = {
  events: HomeEvent[];
};

const HomeEventStatsSection = ({ events }: HomeEventStatsSectionProps) => {
  const totalUpcoming = events.length;
  const paidCount = events.filter(event => event.feeType === 'Paid').length;
  const freeCount = events.filter(event => event.feeType === 'Free').length;
  const avgFee =
    paidCount > 0
      ? Math.round(
          events
            .filter(event => event.fee > 0)
            .reduce((sum, event) => sum + event.fee, 0) / paidCount,
        )
      : 0;

  const items = [
    {
      label: 'Upcoming Public Events',
      value: totalUpcoming,
      helper: 'Fetched dynamically from backend upcoming events',
    },
    {
      label: 'Free Events',
      value: freeCount,
      helper: 'Open access community sessions',
    },
    {
      label: 'Paid Events',
      value: paidCount,
      helper: 'Premium and workshop style sessions',
    },
    {
      label: 'Average Paid Fee',
      value: avgFee > 0 ? `$${avgFee}` : '$0',
      helper: 'Calculated from current paid events',
    },
  ];

  return (
    <section className="bg-[#0e1733] py-14 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-white">Live Event Snapshot</h2>
        <p className="mt-2 text-slate-300">
          Real-time highlights generated from your event inventory.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(item => (
            <article
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm text-slate-300">{item.label}</p>
              <p className="mt-3 text-3xl font-black text-white">
                {item.value}
              </p>
              <p className="mt-2 text-xs text-slate-400">{item.helper}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeEventStatsSection;
