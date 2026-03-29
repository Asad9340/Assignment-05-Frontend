import StaticPageShell from '@/components/modules/Dashboard/StaticPageShell';

const EventParticipantPage = () => {
  return (
    <StaticPageShell
      eyebrow="My Events"
      title="Event Participants"
      description="View accepted users, pending participants, and enforce moderation actions such as banning."
      metrics={[
        { label: 'Accepted', value: '102' },
        { label: 'Pending', value: '17' },
        { label: 'Banned', value: '03' },
      ]}
    />
  );
};

export default EventParticipantPage;
