import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { categoryFilters } from './home-data';

const categoryBadgeClass: Record<string, string> = {
  'public-free': 'bg-emerald-100 text-emerald-700',
  'public-paid': 'bg-amber-100 text-amber-700',
  'private-free': 'bg-sky-100 text-sky-700',
  'private-paid': 'bg-violet-100 text-violet-700',
};

const categoryQueryMap: Record<string, string> = {
  'public-free': 'visibility=PUBLIC&feeType=FREE',
  'public-paid': 'visibility=PUBLIC&feeType=PAID',
  'private-free': 'visibility=PRIVATE&feeType=FREE',
  'private-paid': 'visibility=PRIVATE&feeType=PAID',
};

const HomeCategoriesSection = () => {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900">Event Categories</h2>
        <p className="mt-2 text-slate-600">
          Filter events by visibility and fee type.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categoryFilters.map(filter => (
            <Link
              key={filter.value}
              href={`/events?${categoryQueryMap[filter.value]}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-orange-300 hover:bg-orange-50"
            >
              <Badge
                className={
                  categoryBadgeClass[filter.value] ?? 'bg-slate-900 text-white'
                }
              >
                {filter.label}
              </Badge>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {filter.label}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Browse {filter.label.toLowerCase()} events on Planora.
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategoriesSection;
