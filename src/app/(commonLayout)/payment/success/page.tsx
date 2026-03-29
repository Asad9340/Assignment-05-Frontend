import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentSuccessPage = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-linear-to-br from-emerald-50 via-white to-cyan-50 px-4 py-10">
      <section className="w-full max-w-xl rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-lg sm:p-10">
        <CheckCircle2 className="mx-auto size-14 text-emerald-600" />
        <h1 className="mt-4 text-3xl font-black text-slate-900">
          Payment Successful
        </h1>
        <p className="mt-3 text-slate-600">
          Your payment has been processed successfully. Your participation
          request is now pending host approval.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            className="bg-emerald-600 text-white hover:bg-emerald-500"
          >
            <Link href="/dashboard/pending-invitations">
              View Request Status
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          >
            <Link href="/events">Back to Events</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default PaymentSuccessPage;
