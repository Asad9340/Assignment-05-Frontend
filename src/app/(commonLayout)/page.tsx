import HomeCategoriesSection from '@/components/modules/Home/HomeCategoriesSection';
import HomeCtaSection from '@/components/modules/Home/HomeCtaSection';
import HomeEventStatsSection from '@/components/modules/Home/HomeEventStatsSection';
import HomeFeaturesSection from '@/components/modules/Home/HomeFeaturesSection';
import HomeHeroSection from '@/components/modules/Home/HomeHeroSection';
import HomeHowItWorksSection from '@/components/modules/Home/HomeHowItWorksSection';
import HomeTestimonialsSection from '@/components/modules/Home/HomeTestimonialsSection';
import HomeUpcomingEventsSection from '@/components/modules/Home/HomeUpcomingEventsSection';
import { HomeEvent } from '@/components/modules/Home/home-data';
import { extractArrayPayload, mapEvent } from '@/lib/apiMappers';
import { platformServerServices } from '@/services/platform.server.services';

const toHomeEvent = (input: ReturnType<typeof mapEvent>): HomeEvent => {
  return {
    id: input.id || `event-${Date.now()}`,
    title: input.title,
    description: input.description,
    date: input.eventDate,
    time: input.eventTime,
    venue: input.venue,
    organizer: input.organizerName,
    visibility:
      input.visibility.toUpperCase() === 'PRIVATE' ? 'Private' : 'Public',
    feeType: input.feeType.toUpperCase() === 'PAID' ? 'Paid' : 'Free',
    fee: input.registrationFee,
    participantCount: input.totalParticipants,
  };
};

export default async function HomePage() {
  let dynamicEvents: HomeEvent[] = [];

  try {
    const response = await platformServerServices.getUpcomingEvents();
    dynamicEvents = extractArrayPayload(response.data).map(item =>
      toHomeEvent(mapEvent(item)),
    );
  } catch {
    dynamicEvents = [];
  }

  const featured = dynamicEvents[0];
  const upcoming = dynamicEvents.slice(1, 10);

  return (
    <main className="min-h-screen bg-[#090f20]">
      <HomeHeroSection event={featured} />
      <HomeEventStatsSection events={upcoming} />
      <HomeUpcomingEventsSection events={upcoming} />
      <HomeHowItWorksSection />
      <HomeFeaturesSection />
      <HomeCategoriesSection />
      <HomeTestimonialsSection />
      <HomeCtaSection />
    </main>
  );
}
