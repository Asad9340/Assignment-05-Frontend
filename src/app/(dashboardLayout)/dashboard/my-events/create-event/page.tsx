import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MyEventForm from '@/components/modules/Dashboard/MyEventForm';

const CreateEventPage = () => {
  return (
    <main className="min-h-screen bg-[#f7f8fc] p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-5xl space-y-6">
        <header className="rounded-3xl bg-[#101b3d] p-7 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
            My Events
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Create Event</h1>
          <p className="mt-3 text-slate-200">
            Configure details, visibility, and fee settings for your new event.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-5 border-slate-500 bg-transparent text-slate-100 hover:bg-slate-800"
          >
            <Link href="/dashboard/my-events">
              <ArrowLeft className="size-4" /> Back to My Events
            </Link>
          </Button>
        </header>

        <MyEventForm mode="create" />
      </section>
    </main>
  );
};

export default CreateEventPage;
