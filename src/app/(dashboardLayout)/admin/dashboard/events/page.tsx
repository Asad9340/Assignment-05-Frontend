import StaticPageShell from '@/components/modules/Dashboard/StaticPageShell';

const EventsPage = () => {
  return (
    <StaticPageShell
      eyebrow="Admin"
      title="Events Management"
      description="Audit event content, monitor participation flow, and remove policy-violating events."
      metrics={[
        { label: 'Total Events', value: '1,284' },
        { label: 'Reported Events', value: '11' },
        { label: 'Private Events', value: '320' },
      ]}
      primaryAction="Review Flagged"
    />
  );
};

export default EventsPage;
