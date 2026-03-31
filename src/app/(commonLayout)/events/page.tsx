import Link from 'next/link';
import { CalendarDays, Search, UserRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { extractArrayPayload, mapEvent } from '@/lib/apiMappers';
import { platformServerServices } from '@/services/platform.server.services';
import { getUserInfo } from '@/services/auth.services';
import EventBookingButton from '@/components/modules/Event/EventBookingButton';

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

type EventsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const EventsPage = async ({ searchParams }: EventsPageProps) => {
  const resolvedSearchParams = (await searchParams) || {};
  const searchTerm =
    typeof resolvedSearchParams.searchTerm === 'string'
      ? resolvedSearchParams.searchTerm
      : '';
  const visibilityFilter =
    typeof resolvedSearchParams.visibility === 'string'
      ? resolvedSearchParams.visibility.toUpperCase()
      : '';
  const feeTypeFilter =
    typeof resolvedSearchParams.feeType === 'string'
      ? resolvedSearchParams.feeType.toUpperCase()
      : '';
  const statusFilter =
    typeof resolvedSearchParams.status === 'string'
      ? resolvedSearchParams.status.toUpperCase()
      : '';
  const pageParam =
    typeof resolvedSearchParams.page === 'string'
      ? resolvedSearchParams.page
      : '1';

  const page = Math.max(1, Number(pageParam) || 1);
  const defaultLimit = 9;

  const query: Record<string, unknown> = {
    page,
    limit: defaultLimit,
  };

  if (searchTerm.trim()) {
    query.searchTerm = searchTerm.trim();
  }

  if (visibilityFilter === 'PUBLIC' || visibilityFilter === 'PRIVATE') {
    query.visibility = visibilityFilter;
  }

  if (feeTypeFilter === 'FREE' || feeTypeFilter === 'PAID') {
    query.feeType = feeTypeFilter;
  }

  if (
    statusFilter === 'ACTIVE' ||
    statusFilter === 'COMPLETED' ||
    statusFilter === 'CANCELLED'
  ) {
    query.status = statusFilter;
  }

  let events = [] as ReturnType<typeof mapEvent>[];
  let total = 0;
  let limit = defaultLimit;
  let isError = false;
  const user = await getUserInfo();

  try {
    const response = await platformServerServices.getEvents(query);
    events = extractArrayPayload(response.data).map(item => mapEvent(item));
    total = pickNumber(response.meta?.total, events.length);
    limit = pickNumber(response.meta?.limit, defaultLimit);
  } catch {
    isError = true;
  }

  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)));
  const baseQuery = new URLSearchParams();

  if (searchTerm.trim()) {
    baseQuery.set('searchTerm', searchTerm.trim());
  }
  if (visibilityFilter) {
    baseQuery.set('visibility', visibilityFilter);
  }
  if (feeTypeFilter) {
    baseQuery.set('feeType', feeTypeFilter);
  }
  if (statusFilter) {
    baseQuery.set('status', statusFilter);
  }

  const getPageHref = (nextPage: number) => {
    const params = new URLSearchParams(baseQuery.toString());
    params.set('page', String(nextPage));
    const queryString = params.toString();

    return queryString ? `/events?${queryString}` : '/events';
  };

  const resetHref = '/events';

  return (
    <main className="min-h-screen bg-[#f7f8fc] py-14 sm:py-20">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl bg-[#101b3d] p-8 text-white sm:p-10">
          <h1 className="text-3xl font-bold sm:text-4xl">Discover Events</h1>
          <p className="mt-3 max-w-2xl text-slate-200">
            Search by event title or organizer and filter by event visibility,
            fee type, and status.
          </p>

          <form
            className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-5"
            method="GET"
          >
            <input type="hidden" name="page" value="1" />
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
              <Input
                name="searchTerm"
                defaultValue={searchTerm}
                placeholder="Search by title or organizer"
                className="h-11 border-0 bg-white pl-10 text-slate-900"
              />
            </div>
            <select
              name="visibility"
              defaultValue={visibilityFilter}
              aria-label="Filter by visibility"
              className="h-11 rounded-md border-0 bg-white px-3 text-slate-900"
            >
              <option value="">All Visibility</option>
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
            <select
              name="feeType"
              defaultValue={feeTypeFilter}
              aria-label="Filter by fee type"
              className="h-11 rounded-md border-0 bg-white px-3 text-slate-900"
            >
              <option value="">All Fee Types</option>
              <option value="FREE">Free</option>
              <option value="PAID">Paid</option>
            </select>
            <select
              name="status"
              defaultValue={statusFilter}
              aria-label="Filter by status"
              className="h-11 rounded-md border-0 bg-white px-3 text-slate-900"
            >
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <Button
              type="submit"
              className="h-11 bg-orange-500 text-white hover:bg-orange-400"
            >
              Apply
            </Button>
          </form>

          <div className="mt-3">
            <Button
              asChild
              variant="outline"
              className="border-slate-400 bg-transparent text-slate-100 hover:bg-slate-800"
            >
              <Link href={resetHref}>Reset Filters</Link>
            </Button>
          </div>
        </header>

        {isError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-700">
            Unable to load events right now. Please try again in a moment.
          </div>
        ) : null}

        {!isError && events.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            No events found for this search and filter combination.
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.map(event => (
            <article
              key={event.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-2">
                <Badge className="bg-slate-900 text-white">{`${event.visibility} ${event.feeType}`}</Badge>
                <p className="text-sm font-semibold text-orange-600">
                  {event.registrationFee === 0
                    ? 'Free'
                    : `৳${event.registrationFee}`}
                </p>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {event.status}
              </p>
              <h2 className="mt-4 line-clamp-2 min-h-[3.5rem] text-xl font-bold text-slate-900">
                {event.title}
              </h2>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  {event.eventDate}
                </p>
                <p className="flex items-center gap-2">
                  <UserRound className="size-4" />
                  {event.organizerName}
                </p>
              </div>
              <div className="mt-5 grid gap-2">
                <Button
                  asChild
                  className="w-full bg-[#101b3d] text-white hover:bg-[#172958]"
                >
                  <Link href={`/events/${event.id}`}>View Details</Link>
                </Button>
                <EventBookingButton
                  eventId={event.id}
                  feeType={event.feeType}
                  isAuthenticated={!!user}
                  isOwner={
                    !!user?.id && !!event.ownerId && user.id === event.ownerId
                  }
                  loginRedirectPath={`/events/${event.id}`}
                />
              </div>
            </article>
          ))}
        </div>

        {!isError && events.length > 0 ? (
          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              {page <= 1 ? (
                <Button variant="outline" disabled>
                  Previous
                </Button>
              ) : (
                <Button asChild variant="outline">
                  <Link href={getPageHref(page - 1)}>Previous</Link>
                </Button>
              )}
              {page >= totalPages ? (
                <Button variant="outline" disabled>
                  Next
                </Button>
              ) : (
                <Button asChild variant="outline">
                  <Link href={getPageHref(page + 1)}>Next</Link>
                </Button>
              )}
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default EventsPage;
