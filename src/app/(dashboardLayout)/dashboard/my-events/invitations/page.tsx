import StaticPageShell from '@/components/modules/Dashboard/StaticPageShell';

const MyEventInvitationsPage = () => {
  return (
    <StaticPageShell
      eyebrow="My Events"
      title="My Event Invitations"
      description="Invite participants directly and monitor acceptance, payment, and approval status."
      metrics={[
        { label: 'Sent Invites', value: '32' },
        { label: 'Accepted', value: '19' },
        { label: 'Declined', value: '05' },
      ]}
      primaryAction="Invite Users"
    />
  );
};

export default MyEventInvitationsPage;
