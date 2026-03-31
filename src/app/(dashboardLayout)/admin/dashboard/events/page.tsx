import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AdminEventRowActions from '@/components/modules/Dashboard/AdminEventRowActions';
import { extractArrayPayload } from '@/lib/apiMappers';
import { platformServerServices } from '@/services/platform.server.services';

const asRecord = (value: unknown): Record<string, unknown> => {
  return value && typeof value === 'object'
    ? (value as Record<string, unknown>)
    : {};
};

const pickString = (value: unknown, fallback = ''): string => {
  return typeof value === 'string' ? value : fallback;
};

const pickNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
};

type AdminEventsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const EventsPage = async ({ searchParams }: AdminEventsPageProps) => {
  const resolvedSearchParams = (await searchParams) || {};
  const searchTerm =
    typeof resolvedSearchParams.searchTerm === 'string'
      ? resolvedSearchParams.searchTerm
      : '';
  const pageParam =
    typeof resolvedSearchParams.page === 'string'
      ? resolvedSearchParams.page
      : '1';
  const page = Math.max(1, Number(pageParam) || 1);

  let events = [] as unknown[];
  let total = 0;
  let limit = 10;

  try {
    const response = await platformServerServices.getAdminEvents({
      page,
      limit,
      ...(searchTerm ? { searchTerm } : {}),
    });

    events = extractArrayPayload(response.data);
    total = pickNumber(response.meta?.total);
    limit = pickNumber(response.meta?.limit, 10);
  } catch {
    events = [];
    total = 0;
  }

  const privateCount = events.filter(item => {
    const event = asRecord(item);
    return pickString(event.visibility).toUpperCase() === 'PRIVATE';
  }).length;
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)));

  return (
    <main className="space-y-6">
      <section className="rounded-3xl bg-[#101b3d] p-7 text-white sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
          Admin
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Events Management
        </h1>
        <p className="mt-3 max-w-3xl text-slate-200">
          Audit published events and remove policy-violating content.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-600">Total Events</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{total}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-600">Private On This Page</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {privateCount}
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-600">Current Page</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{page}</p>
        </article>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <form
          className="mb-4 flex flex-col gap-3 sm:flex-row"
          action="/admin/dashboard/events"
          method="get"
        >
          <input
            name="searchTerm"
            defaultValue={searchTerm}
            placeholder="Search by title or owner"
            className="h-11 flex-1 rounded-lg border border-slate-300 px-3 text-sm"
          />
          <Button
            type="submit"
            className="h-11 bg-[#101b3d] text-white hover:bg-[#1a2f66]"
          >
            Search
          </Button>
        </form>

        <div className="space-y-3">
          {events.map(item => {
            const event = asRecord(item);
            const owner = asRecord(event.owner);
            const count = asRecord(event._count);
            const eventId = pickString(event.id);

            return (
              <article
                key={eventId}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {pickString(event.title, 'Untitled event')}
                    </p>
                    <p className="text-sm text-slate-600">
                      Owner: {pickString(owner.name, 'Unknown')} (
                      {pickString(owner.email, 'N/A')})
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Visibility: {pickString(event.visibility, 'N/A')} | Fee:{' '}
                      {pickString(event.feeType, 'N/A')} | Participants:{' '}
                      {pickNumber(count.participants)} | Reviews:{' '}
                      {pickNumber(count.reviews)}
                    </p>
                    <div className="mt-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/dashboard/events/${eventId}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <AdminEventRowActions eventId={eventId} />
                </div>
              </article>
            );
          })}

          {events.length === 0 ? (
            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              No events found.
            </p>
          ) : null}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button asChild size="sm" variant="outline" disabled={page <= 1}>
              <Link
                href={`/admin/dashboard/events?page=${Math.max(1, page - 1)}${searchTerm ? `&searchTerm=${encodeURIComponent(searchTerm)}` : ''}`}
              >
                Previous
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              disabled={page >= totalPages}
            >
              <Link
                href={`/admin/dashboard/events?page=${Math.min(totalPages, page + 1)}${searchTerm ? `&searchTerm=${encodeURIComponent(searchTerm)}` : ''}`}
              >
                Next
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventsPage;
