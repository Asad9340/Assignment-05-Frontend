import StaticPageShell from '@/components/modules/Dashboard/StaticPageShell';

const MyEventsPage = () => {
  return (
    <StaticPageShell
      eyebrow="Dashboard"
      title="My Events"
      description="Create, update, and manage your events with approval controls and participant moderation."
      metrics={[
        { label: 'Total Events', value: '14' },
        { label: 'Active Events', value: '07' },
        { label: 'Draft Events', value: '02' },
      ]}
      primaryAction="Create Event"
      secondaryAction="Manage Participants"
    />
  );
};

export default MyEventsPage;
