import StaticPageShell from '@/components/modules/Dashboard/StaticPageShell';

const CreateEventPage = () => {
  return (
    <StaticPageShell
      eyebrow="My Events"
      title="Create Event"
      description="Set event title, date, venue, visibility, and registration fee from a guided creation flow."
      primaryAction="Save Draft"
      secondaryAction="Publish Event"
    />
  );
};

export default CreateEventPage;
