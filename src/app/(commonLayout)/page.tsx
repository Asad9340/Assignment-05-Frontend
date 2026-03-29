import HomeCategoriesSection from '@/components/modules/Home/HomeCategoriesSection';
import HomeCtaSection from '@/components/modules/Home/HomeCtaSection';
import HomeFooter from '@/components/modules/Home/HomeFooter';
import HomeHeroSection from '@/components/modules/Home/HomeHeroSection';
import HomeNavbar from '@/components/modules/Home/HomeNavbar';
import HomeUpcomingEventsSection from '@/components/modules/Home/HomeUpcomingEventsSection';
import { HomeEvent } from '@/components/modules/Home/home-data';
import { extractArrayPayload, mapEvent } from '@/lib/apiMappers';
import { platformServices } from '@/services/platform.services';

const toHomeEvent = (input: ReturnType<typeof mapEvent>): HomeEvent => {
  return {
    id: input.id || `event-${Date.now()}`,
    title: input.title,
    date: input.eventDate,
    organizer: input.organizerName,
    visibility:
      input.visibility.toUpperCase() === 'PRIVATE' ? 'Private' : 'Public',
    feeType: input.feeType.toUpperCase() === 'PAID' ? 'Paid' : 'Free',
    fee: input.registrationFee,
  };
};

export default async function HomePage() {
  let dynamicEvents: HomeEvent[] = [];

  try {
    const response = await platformServices.getUpcomingEvents();
    dynamicEvents = extractArrayPayload(response.data).map(item =>
      toHomeEvent(mapEvent(item)),
    );
  } catch {
    dynamicEvents = [];
  }

  const featured = dynamicEvents[0];
  const upcoming = dynamicEvents.slice(0, 9);

  return (
    <main className="min-h-screen bg-[#090f20]">
      <HomeNavbar />
      <HomeHeroSection event={featured} />
      <HomeUpcomingEventsSection
        events={upcoming.length > 0 ? upcoming : undefined}
      />
      <HomeCategoriesSection />
      <HomeCtaSection />
      <HomeFooter />
    </main>
  );
}
