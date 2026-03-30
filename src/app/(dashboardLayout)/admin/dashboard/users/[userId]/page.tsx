import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AdminUserRowActions from '@/components/modules/Dashboard/AdminUserRowActions';
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

type UserDetailsManagementPageProps = {
  params: Promise<{ userId: string }>;
};

const UserDetailsManagementPage = async ({
  params,
}: UserDetailsManagementPageProps) => {
  const { userId } = await params;

  let user = asRecord({});

  try {
    const response = await platformServerServices.getAdminUserById(userId);
    user = asRecord(response.data);
  } catch {
    return (
      <main className="min-h-screen bg-[#f7f8fc] p-4 sm:p-6 lg:p-8">
        <section className="mx-auto w-full max-w-3xl rounded-3xl border border-rose-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-black text-slate-900">User Not Found</h1>
          <p className="mt-2 text-slate-600">
            This user may not exist anymore.
          </p>
          <Button
            asChild
            className="mt-5 bg-[#101b3d] text-white hover:bg-[#1a2f66]"
          >
            <Link href="/admin/dashboard/users">Back to Users</Link>
          </Button>
        </section>
      </main>
    );
  }

  const count = asRecord(user._count);
  const hostedEvents = extractArrayPayload(user.events);
  const joinedEvents = extractArrayPayload(user.eventParticipants);
  const reviews = extractArrayPayload(user.eventReviews);

  return (
    <main className="min-h-screen bg-[#f7f8fc] p-4 sm:p-6 lg:p-8">
      <section className="mx-auto w-full max-w-7xl space-y-6">
        <header className="rounded-3xl bg-[#101b3d] p-7 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">User Details</h1>
          <p className="mt-3 text-slate-200">
            {pickString(user.name, 'Unnamed user')} (
            {pickString(user.email, 'N/A')})
          </p>
          <div className="mt-4">
            <AdminUserRowActions
              userId={pickString(user.id)}
              status={pickString(user.status)}
              role={pickString(user.role)}
            />
          </div>
          <div className="mt-4">
            <Button
              asChild
              variant="outline"
              className="border-slate-500 bg-transparent text-slate-100 hover:bg-slate-800"
            >
              <Link href="/admin/dashboard/users">Back to Users</Link>
            </Button>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">Role</p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              {pickString(user.role, 'N/A')}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">Status</p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              {pickString(user.status, 'N/A')}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">Hosted Events</p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              {pickNumber(count.events)}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">Reviews</p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              {pickNumber(count.eventReviews)}
            </p>
          </article>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Hosted Events
          </h2>
          <div className="mt-4 space-y-2">
            {hostedEvents.map(item => {
              const event = asRecord(item);
              return (
                <article
                  key={pickString(event.id)}
                  className="rounded-xl border border-slate-200 p-3"
                >
                  <p className="font-medium text-slate-900">
                    {pickString(event.title, 'Untitled event')}
                  </p>
                  <p className="text-sm text-slate-600">
                    {pickString(event.visibility, 'N/A')} |{' '}
                    {pickString(event.feeType, 'N/A')}
                  </p>
                </article>
              );
            })}
            {hostedEvents.length === 0 ? (
              <p className="text-sm text-slate-500">No hosted events found.</p>
            ) : null}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Joined Events
          </h2>
          <div className="mt-4 space-y-2">
            {joinedEvents.map(item => {
              const participation = asRecord(item);
              const event = asRecord(participation.event);
              return (
                <article
                  key={pickString(participation.id)}
                  className="rounded-xl border border-slate-200 p-3"
                >
                  <p className="font-medium text-slate-900">
                    {pickString(event.title, 'Untitled event')}
                  </p>
                  <p className="text-sm text-slate-600">
                    Status: {pickString(participation.status, 'N/A')} | Payment:{' '}
                    {pickString(participation.paymentStatus, 'N/A')}
                  </p>
                </article>
              );
            })}
            {joinedEvents.length === 0 ? (
              <p className="text-sm text-slate-500">No joined events found.</p>
            ) : null}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Recent Reviews</h2>
          <div className="mt-4 space-y-2">
            {reviews.map(item => {
              const review = asRecord(item);
              const event = asRecord(review.event);
              return (
                <article
                  key={pickString(review.id)}
                  className="rounded-xl border border-slate-200 p-3"
                >
                  <p className="font-medium text-slate-900">
                    {pickString(event.title, 'Untitled event')}
                  </p>
                  <p className="text-sm text-slate-600">
                    Rating: {pickNumber(review.rating, 0)}/5
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {pickString(review.review, 'No review text')}
                  </p>
                </article>
              );
            })}
            {reviews.length === 0 ? (
              <p className="text-sm text-slate-500">No reviews found.</p>
            ) : null}
          </div>
        </section>
      </section>
    </main>
  );
};

export default UserDetailsManagementPage;
