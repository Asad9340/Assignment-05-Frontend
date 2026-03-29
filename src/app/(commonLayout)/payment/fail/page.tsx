import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentFailPage = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-linear-to-br from-rose-50 via-white to-orange-50 px-4 py-10">
      <section className="w-full max-w-xl rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-lg sm:p-10">
        <AlertTriangle className="mx-auto size-14 text-rose-600" />
        <h1 className="mt-4 text-3xl font-black text-slate-900">
          Payment Failed
        </h1>
        <p className="mt-3 text-slate-600">
          We could not complete your payment. Please retry with a valid payment
          method or contact support if the issue persists.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-rose-600 text-white hover:bg-rose-500">
            <Link href="/events">Retry Payment</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          >
            <Link href="/contact-us">Contact Support</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default PaymentFailPage;
