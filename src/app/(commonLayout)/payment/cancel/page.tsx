import Link from 'next/link';
import { CircleOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentCancelPage = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-linear-to-br from-slate-100 via-white to-slate-200 px-4 py-10">
      <section className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg sm:p-10">
        <CircleOff className="mx-auto size-14 text-slate-500" />
        <h1 className="mt-4 text-3xl font-black text-slate-900">
          Payment Cancelled
        </h1>
        <p className="mt-3 text-slate-600">
          You cancelled the payment process. No charge was made and your event
          request was not submitted.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            className="bg-slate-900 text-white hover:bg-slate-700"
          >
            <Link href="/events">Return to Events</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          >
            <Link href="/dashboard/my-events">Go to My Events</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default PaymentCancelPage;
