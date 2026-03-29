import { Activity, CreditCard, Users } from 'lucide-react';

const stats = [
  { title: 'Total Events', value: '1,284', delta: '+12.6%', icon: Activity },
  { title: 'Active Users', value: '9,402', delta: '+8.1%', icon: Users },
  {
    title: 'Payment Volume',
    value: '$52,300',
    delta: '+16.2%',
    icon: CreditCard,
  },
];

const ReportsPage = () => {
  return (
    <main className="min-h-screen bg-[#f7f8fc] p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-7xl space-y-6">
        <header className="rounded-3xl bg-[#101b3d] p-7 text-white sm:p-10">
          <h1 className="text-3xl font-black sm:text-4xl">Admin Reports</h1>
          <p className="mt-2 text-slate-200">
            Monitor platform events, users, and payment trends from a single
            control center.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <article
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-600">
                    {stat.title}
                  </p>
                  <span className="rounded-lg bg-slate-100 p-2 text-slate-700">
                    <Icon className="size-4" />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-black text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-emerald-600">
                  {stat.delta} this month
                </p>
              </article>
            );
          })}
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Moderation Snapshot
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-140 text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="py-2">Category</th>
                  <th className="py-2">Count</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-t border-slate-100">
                  <td className="py-3">Pending Join Requests</td>
                  <td className="py-3">64</td>
                  <td className="py-3 text-amber-600">Needs review</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-3">Flagged Events</td>
                  <td className="py-3">11</td>
                  <td className="py-3 text-rose-600">Urgent</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-3">Resolved Reports</td>
                  <td className="py-3">97</td>
                  <td className="py-3 text-emerald-600">Completed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
};

export default ReportsPage;
