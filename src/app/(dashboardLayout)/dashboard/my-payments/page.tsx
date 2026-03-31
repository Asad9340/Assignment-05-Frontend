import { extractArrayPayload, mapParticipation } from '@/lib/apiMappers';
import { platformServerServices } from '@/services/platform.server.services';

const MyPaymentsPage = async () => {
  let paymentRows = [] as ReturnType<typeof mapParticipation>[];

  try {
    const response = await platformServerServices.getMyParticipations();
    paymentRows = extractArrayPayload(response.data).map(item =>
      mapParticipation(item),
    );
  } catch {
    paymentRows = [];
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-6xl space-y-6">
        <header className="rounded-3xl bg-[#101b3d] p-7 text-white sm:p-10">
          <h1 className="text-3xl font-black sm:text-4xl">My Payments</h1>
          <p className="mt-2 text-slate-200">
            Track payment status, transaction history, and approval state for
            paid events.
          </p>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Payment History</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-160 text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="py-2">Event</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {paymentRows.map(row => (
                  <tr
                    key={`${row.id}-${row.createdAt}`}
                    className="border-t border-slate-100 text-slate-700"
                  >
                    <td className="py-3">{row.eventTitle}</td>
                    <td className="py-3 font-semibold">
                      {row.registrationFee === 0
                        ? 'Free'
                        : `৳${row.registrationFee}`}
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          row.paymentStatus.toUpperCase() === 'PAID'
                            ? 'bg-emerald-100 text-emerald-700'
                            : row.status.toUpperCase().includes('APPROVED')
                              ? 'bg-sky-100 text-sky-700'
                              : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {row.paymentStatus.toUpperCase() === 'PAID'
                          ? 'Paid'
                          : row.status}
                      </span>
                    </td>
                    <td className="py-3">
                      {row.createdAt
                        ? new Date(row.createdAt).toLocaleDateString()
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {paymentRows.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">
                No payment records found yet.
              </p>
            ) : null}
          </div>
        </section>
      </section>
    </main>
  );
};

export default MyPaymentsPage;
