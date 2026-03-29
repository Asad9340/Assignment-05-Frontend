import StaticPageShell from '@/components/modules/Dashboard/StaticPageShell';

const UserDetailsManagementPage = () => {
  return (
    <StaticPageShell
      eyebrow="Admin"
      title="User Details"
      description="Review account history, role permissions, and moderation actions for this user."
      metrics={[
        { label: 'Joined Events', value: '24' },
        { label: 'Hosted Events', value: '03' },
        { label: 'Risk Score', value: 'Low' },
      ]}
    />
  );
};

export default UserDetailsManagementPage;
