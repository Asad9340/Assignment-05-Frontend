import { Badge } from '@/components/ui/badge';
import { categoryFilters } from './home-data';

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
            <div
              key={filter.value}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-orange-300 hover:bg-orange-50"
            >
              <Badge className="bg-slate-900 text-white">Category</Badge>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {filter.label}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Browse events and discover opportunities that match this
                category.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategoriesSection;
