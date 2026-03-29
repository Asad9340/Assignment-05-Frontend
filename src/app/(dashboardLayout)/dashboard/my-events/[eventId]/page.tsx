import StaticPageShell from '@/components/modules/Dashboard/StaticPageShell';

const MyEventDetailsPage = () => {
  return (
    <StaticPageShell
      eyebrow="My Events"
      title="Event Details"
      description="Monitor event performance, approval queue, and participation metrics for this event."
      metrics={[
        { label: 'Participants', value: '124' },
        { label: 'Pending Requests', value: '09' },
        { label: 'Revenue', value: '$1,680' },
      ]}
    />
  );
};

export default MyEventDetailsPage;
