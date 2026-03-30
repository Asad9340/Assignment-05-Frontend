import Link from 'next/link';
import { CalendarDays, Search, UserRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { extractArrayPayload, mapEvent } from '@/lib/apiMappers';
import { platformServerServices } from '@/services/platform.server.services';
import { getUserInfo } from '@/services/auth.services';
import EventBookingButton from '@/components/modules/Event/EventBookingButton';

const filters = ['Public Free', 'Public Paid', 'Private Free', 'Private Paid'];

const parseFilter = (filter: string) => {
  const normalized = filter.toLowerCase();

  if (normalized === 'public free') {
    return { visibility: 'PUBLIC', feeType: 'FREE' };
  }
  if (normalized === 'public paid') {
    return { visibility: 'PUBLIC', feeType: 'PAID' };
  }
  if (normalized === 'private free') {
    return { visibility: 'PRIVATE', feeType: 'FREE' };
  }
  if (normalized === 'private paid') {
    return { visibility: 'PRIVATE', feeType: 'PAID' };
  }

  return {};
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
  const selectedFilter =
    typeof resolvedSearchParams.filter === 'string'
      ? resolvedSearchParams.filter
      : '';

  const filterQuery = parseFilter(selectedFilter);

  const query: Record<string, unknown> = {
    ...filterQuery,
    limit: 100,
  };

  if (searchTerm.trim()) {
    query.searchTerm = searchTerm.trim();
  }

  let events = [] as ReturnType<typeof mapEvent>[];
  let isError = false;
  const user = await getUserInfo();

  try {
    const response = await platformServerServices.getEvents(query);
    events = extractArrayPayload(response.data).map(item => mapEvent(item));
  } catch {
    isError = true;
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] py-14 sm:py-20">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl bg-[#101b3d] p-8 text-white sm:p-10">
          <h1 className="text-3xl font-black sm:text-4xl">Discover Events</h1>
          <p className="mt-3 max-w-2xl text-slate-200">
            Search by event title or organizer and filter by privacy and
            registration fee.
          </p>

          <form
            className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]"
            method="GET"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
              <Input
                name="searchTerm"
                defaultValue={searchTerm}
                placeholder="Search by title or organizer"
                className="h-11 border-0 bg-white pl-10 text-slate-900"
              />
            </div>
            <Button
              type="submit"
              className="h-11 bg-orange-500 text-white hover:bg-orange-400"
            >
              Search
            </Button>
          </form>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            asChild
            variant="outline"
            className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          >
            <Link
              href={
                searchTerm
                  ? `/events?searchTerm=${encodeURIComponent(searchTerm)}`
                  : '/events'
              }
            >
              All Events
            </Link>
          </Button>
          {filters.map(filter => (
            <Button
              key={filter}
              asChild
              variant="outline"
              className="border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            >
              <Link
                href={`/events?filter=${encodeURIComponent(filter)}${searchTerm ? `&searchTerm=${encodeURIComponent(searchTerm)}` : ''}`}
              >
                {filter}
              </Link>
            </Button>
          ))}
        </div>

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
                    : `BDT ${event.registrationFee}`}
                </p>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-900">
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
      </section>
    </main>
  );
};

export default EventsPage;
