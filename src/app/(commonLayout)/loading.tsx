import { LoaderCircle } from 'lucide-react';

const CommonLayoutLoading = () => {
  return (
    <main className="min-h-[70vh] bg-[#f8fafc] px-4 py-16 sm:py-24">
      <section className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="flex items-center justify-center gap-3 text-slate-800">
          <LoaderCircle className="size-6 animate-spin text-orange-500" />
          <p className="text-lg font-semibold">Preparing your page...</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="h-6 w-1/2 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-slate-100" />
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
            <div className="mt-3 h-16 animate-pulse rounded-xl bg-slate-100" />
            <div className="mt-3 h-16 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default CommonLayoutLoading;
