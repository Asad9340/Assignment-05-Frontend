import { LoaderCircle } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <main className="min-h-[70vh] bg-[#f8fafc] px-4 py-16 sm:py-24">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex items-center justify-center gap-3 text-slate-800">
          <LoaderCircle className="size-6 animate-spin text-orange-500" />
          <p className="text-lg font-semibold">Loading content...</p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="h-5 w-2/5 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="h-28 animate-pulse rounded-2xl bg-slate-100" />
          <div className="h-28 animate-pulse rounded-2xl bg-slate-100" />
          <div className="h-28 animate-pulse rounded-2xl bg-slate-100" />
        </div>
      </section>
    </main>
  );
}
