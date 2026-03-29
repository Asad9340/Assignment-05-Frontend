import StaticPageShell from '@/components/modules/Dashboard/StaticPageShell';
import { extractArrayPayload, mapReview } from '@/lib/apiMappers';
import { platformServices } from '@/services/platform.services';

const MyReviewsPage = async () => {
  let reviews = [] as ReturnType<typeof mapReview>[];

  try {
    const response = await platformServices.getMyReviews();
    reviews = extractArrayPayload(response.data).map(item => mapReview(item));
  } catch {
    reviews = [];
  }

  return (
    <StaticPageShell
      eyebrow="Dashboard"
      title="My Reviews"
      description="View, update, and manage event ratings and written feedback during the review period."
      metrics={[
        { label: 'Published Reviews', value: String(reviews.length) },
        {
          label: 'Average Rating',
          value:
            reviews.length > 0
              ? (
                  reviews.reduce((sum, review) => sum + review.rating, 0) /
                  reviews.length
                ).toFixed(1)
              : '0.0',
        },
      ]}
      primaryAction="Write New Review"
    >
      <div className="space-y-3">
        {reviews.slice(0, 6).map(review => (
          <div
            key={review.id}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <p className="text-sm font-semibold text-slate-900">
              {review.rating}/5 rating
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {review.review || 'No review text provided.'}
            </p>
          </div>
        ))}
        {reviews.length === 0 ? (
          <p className="text-sm text-slate-500">No reviews found yet.</p>
        ) : null}
      </div>
    </StaticPageShell>
  );
};

export default MyReviewsPage;
