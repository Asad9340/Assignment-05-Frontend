import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, SearchX } from 'lucide-react';

const CommonLayoutNotFound = () => {
  return (
    <main className="min-h-[70vh] bg-[#f8fafc] px-4 py-16 sm:py-24">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
              Common Layout
            </p>
            <h1 className="mt-3 text-4xl font-black text-slate-900 sm:text-5xl">
              We Could Not Find This Page
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              The link may be broken or the page might have been moved. Try
              navigating back to a known section of the site.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="bg-[#101b3d] text-white hover:bg-[#172958]"
              >
                <Link href="/">
                  <ArrowLeft className="size-4" />
                  Return Home
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="/events">
                  <SearchX className="size-4" />
                  Explore Events
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-100 p-6 text-center">
            <p className="text-sm font-semibold text-slate-500">Error Code</p>
            <p className="mt-2 text-7xl font-black text-slate-900">404</p>
            <p className="mt-3 text-sm text-slate-600">
              Page not found in this section.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CommonLayoutNotFound;
