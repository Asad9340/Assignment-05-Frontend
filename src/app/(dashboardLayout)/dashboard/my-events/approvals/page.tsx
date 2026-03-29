import StaticPageShell from '@/components/modules/Dashboard/StaticPageShell';

const MyEventApprovalsPage = () => {
  return (
    <StaticPageShell
      eyebrow="My Events"
      title="My Event Approvals"
      description="Approve or reject participation requests for public paid and private events."
      metrics={[
        { label: 'Approval Queue', value: '15' },
        { label: 'Approved Today', value: '08' },
      ]}
      primaryAction="Approve Selected"
      secondaryAction="Reject Selected"
    />
  );
};

export default MyEventApprovalsPage;
