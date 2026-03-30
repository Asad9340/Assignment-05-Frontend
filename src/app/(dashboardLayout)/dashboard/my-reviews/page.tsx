import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MyReviewCard from '@/components/modules/Dashboard/MyReviewCard';
import StaticPageShell from '@/components/modules/Dashboard/StaticPageShell';
import { extractArrayPayload, mapReview } from '@/lib/apiMappers';
import { platformServerServices } from '@/services/platform.server.services';

const MyReviewsPage = async () => {
  let reviews = [] as ReturnType<typeof mapReview>[];

  try {
    const response = await platformServerServices.getMyReviews();
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
    >
      <div className="space-y-3">
        <div className="flex flex-wrap justify-end">
          <Button asChild variant="outline">
            <Link href="/events">Browse Events to Review</Link>
          </Button>
        </div>

        {reviews.map(review => (
          <MyReviewCard
            key={review.id}
            reviewId={review.id}
            rating={review.rating}
            reviewText={review.review}
            eventTitle={review.eventTitle}
            createdAt={review.createdAt}
          />
        ))}
        {reviews.length === 0 ? (
          <p className="text-sm text-slate-500">No reviews found yet.</p>
        ) : null}
      </div>
    </StaticPageShell>
  );
};

export default MyReviewsPage;
