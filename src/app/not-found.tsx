import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass, House } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-[#f8fafc] px-4 py-16 sm:py-24">
      <section className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-black text-slate-900 sm:text-6xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          The page you are looking for does not exist or has been moved. Please
          use one of the links below.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="bg-[#101b3d] text-white hover:bg-[#172958]"
          >
            <Link href="/">
              <House className="size-4" />
              Back to Home
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/events">
              <Compass className="size-4" />
              Browse Events
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
