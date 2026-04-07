import Link from 'next/link';
import { CalendarDays, UserRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { extractArrayPayload, mapEvent } from '@/lib/apiMappers';
import { platformServerServices } from '@/services/platform.server.services';
import { getUserInfo } from '@/services/auth.services';
import EventBookingButton from '@/components/modules/Event/EventBookingButton';
import AiEventSearchInput from '@/components/modules/Event/AiEventSearchInput';

const asRecord = (value: unknown): Record<string, unknown> => {
  return value && typeof value === 'object'
    ? (value as Record<string, unknown>)
    : {};
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

type EventsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type SortOption =
  | 'date_desc'
  | 'date_asc'
  | 'fee_asc'
  | 'fee_desc'
  | 'title_asc'
  | 'title_desc';

const validSortOptions: SortOption[] = [
  'date_desc',
  'date_asc',
  'fee_asc',
  'fee_desc',
  'title_asc',
  'title_desc',
];

const getSortValue = (value: string | undefined): SortOption => {
  if (!value) return 'date_desc';
  return validSortOptions.includes(value as SortOption)
    ? (value as SortOption)
    : 'date_desc';
};

const getDateTimestamp = (value: string): number => {
  const ts = Date.parse(value);
  return Number.isFinite(ts) ? ts : 0;
};

const filterSelectClassName =
  'h-11 rounded-md border border-white/20 bg-background/90 px-3 text-foreground shadow-sm md:col-span-2 dark:border-white/20 dark:bg-slate-900/80 dark:text-slate-100';

const filterOptionClassName =
  'bg-background text-foreground dark:bg-slate-900 dark:text-slate-100';

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
  const sortBy =
    typeof resolvedSearchParams.sortBy === 'string'
      ? getSortValue(resolvedSearchParams.sortBy)
      : 'date_desc';
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
  let trendingSearches: string[] = [];
  const user = await getUserInfo();

  try {
    const suggestionsResponse =
      await platformServerServices.getEventSearchSuggestions({ limit: 6 });
    const suggestionsPayload = asRecord(suggestionsResponse.data);
    const rawTrending = Array.isArray(suggestionsPayload.trending)
      ? suggestionsPayload.trending
      : [];

    trendingSearches = rawTrending
      .map(item => {
        const trendingItem = asRecord(item);
        return typeof trendingItem.title === 'string' ? trendingItem.title : '';
      })
      .filter(Boolean)
      .slice(0, 6);
  } catch {
    trendingSearches = [];
  }

  try {
    const response = await platformServerServices.getEvents(query);
    events = extractArrayPayload(response.data).map(item => mapEvent(item));
    total = pickNumber(response.meta?.total, events.length);
    limit = pickNumber(response.meta?.limit, defaultLimit);
  } catch {
    isError = true;
  }

  events.sort((a, b) => {
    if (sortBy === 'fee_asc') return a.registrationFee - b.registrationFee;
    if (sortBy === 'fee_desc') return b.registrationFee - a.registrationFee;
    if (sortBy === 'title_asc') return a.title.localeCompare(b.title);
    if (sortBy === 'title_desc') return b.title.localeCompare(a.title);
    if (sortBy === 'date_asc') {
      return getDateTimestamp(a.eventDate) - getDateTimestamp(b.eventDate);
    }
    return getDateTimestamp(b.eventDate) - getDateTimestamp(a.eventDate);
  });

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
  if (sortBy) {
    baseQuery.set('sortBy', sortBy);
  }

  const getPageHref = (nextPage: number) => {
    const params = new URLSearchParams(baseQuery.toString());
    params.set('page', String(nextPage));
    const queryString = params.toString();

    return queryString ? `/events?${queryString}` : '/events';
  };

  const resetHref = '/events';

  return (
    <main className="min-h-screen bg-background py-14 sm:py-20">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl bg-primary p-8 text-primary-foreground dark:bg-card dark:text-card-foreground sm:p-10">
          <h1 className="text-3xl font-bold sm:text-4xl">Discover Events</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80 dark:text-muted-foreground">
            Search by event title or organizer and filter by event visibility,
            fee type, and status.
          </p>

          <form className="mt-6 space-y-3" method="GET">
            <input type="hidden" name="page" value="1" />
            <div className="grid gap-3 md:grid-cols-12">
              <AiEventSearchInput
                name="searchTerm"
                defaultValue={searchTerm}
                placeholder="Search by title, organizer, or venue"
              />
              <select
                name="visibility"
                defaultValue={visibilityFilter}
                aria-label="Filter by visibility"
                className={filterSelectClassName}
              >
                <option value="" className={filterOptionClassName}>
                  All Visibility
                </option>
                <option value="PUBLIC" className={filterOptionClassName}>
                  Public
                </option>
                <option value="PRIVATE" className={filterOptionClassName}>
                  Private
                </option>
              </select>
              <select
                name="feeType"
                defaultValue={feeTypeFilter}
                aria-label="Filter by fee type"
                className={filterSelectClassName}
              >
                <option value="" className={filterOptionClassName}>
                  All Fee Types
                </option>
                <option value="FREE" className={filterOptionClassName}>
                  Free
                </option>
                <option value="PAID" className={filterOptionClassName}>
                  Paid
                </option>
              </select>
              <select
                name="status"
                defaultValue={statusFilter}
                aria-label="Filter by status"
                className={filterSelectClassName}
              >
                <option value="" className={filterOptionClassName}>
                  All Status
                </option>
                <option value="ACTIVE" className={filterOptionClassName}>
                  Active
                </option>
                <option value="COMPLETED" className={filterOptionClassName}>
                  Completed
                </option>
                <option value="CANCELLED" className={filterOptionClassName}>
                  Cancelled
                </option>
              </select>
              <select
                name="sortBy"
                defaultValue={sortBy}
                aria-label="Sort events"
                className={filterSelectClassName}
              >
                <option value="date_desc" className={filterOptionClassName}>
                  Sort: Newest
                </option>
                <option value="date_asc" className={filterOptionClassName}>
                  Sort: Oldest
                </option>
                <option value="fee_asc" className={filterOptionClassName}>
                  Sort: Fee Low to High
                </option>
                <option value="fee_desc" className={filterOptionClassName}>
                  Sort: Fee High to Low
                </option>
                <option value="title_asc" className={filterOptionClassName}>
                  Sort: Title A-Z
                </option>
                <option value="title_desc" className={filterOptionClassName}>
                  Sort: Title Z-A
                </option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="submit"
                className="h-10 min-w-28 bg-orange-500 text-white hover:bg-orange-400"
              >
                Apply Filters
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-10 min-w-28 border-border bg-transparent text-primary-foreground hover:bg-primary/80 dark:text-foreground dark:hover:bg-muted"
              >
                <Link href={resetHref}>Reset</Link>
              </Button>
            </div>
          </form>

          {trendingSearches.length > 0 ? (
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground/70 dark:text-muted-foreground">
                Trending AI Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map(item => (
                  <Button
                    key={item}
                    asChild
                    size="sm"
                    variant="secondary"
                    className="bg-card text-foreground hover:bg-card/80"
                  >
                    <Link
                      href={`/events?searchTerm=${encodeURIComponent(item)}`}
                    >
                      {item}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
        </header>

        {isError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-700">
            Unable to load events right now. Please try again in a moment.
          </div>
        ) : null}

        {!isError && events.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
            No events found for this search and filter combination.
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.map(event => (
            <article
              key={event.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-2">
                <Badge className="bg-primary text-white">{`${event.visibility} ${event.feeType}`}</Badge>
                <p className="text-sm font-semibold text-orange-600">
                  {event.registrationFee === 0
                    ? 'Free'
                    : `৳${event.registrationFee}`}
                </p>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {event.status}
              </p>
              <h2 className="mt-4 line-clamp-2 min-h-14 text-xl font-bold text-foreground">
                {event.title}
              </h2>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  {event.eventDate}
                </p>
                <p className="flex items-center gap-2">
                  <UserRound className="size-4" />
                  {event.organizerName}
                </p>
              </div>
              <div className="mt-5 border-t border-border pt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Actions
                </p>
                <Button
                  asChild
                  className="w-full bg-primary text-white hover:bg-primary/90"
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
            <p className="text-sm text-muted-foreground">
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
