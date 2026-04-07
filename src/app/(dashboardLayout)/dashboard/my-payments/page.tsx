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
    <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-6xl space-y-6">
        <header className="rounded-3xl bg-primary p-7 text-primary-foreground dark:bg-card dark:text-card-foreground sm:p-10">
          <h1 className="text-3xl font-bold sm:text-4xl">My Payments</h1>
          <p className="mt-2 text-primary-foreground/80 dark:text-muted-foreground">
            Track payment status, transaction history, and approval state for
            paid events.
          </p>
        </header>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground">Payment History</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-160 text-left text-sm">
              <thead className="text-muted-foreground">
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
                    className="border-t border-border text-muted-foreground"
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
              <p className="mt-4 text-sm text-muted-foreground">
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
