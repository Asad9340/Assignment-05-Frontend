import StaticPageShell from '@/components/modules/Dashboard/StaticPageShell';

const UserManagementPage = () => {
  return (
    <StaticPageShell
      eyebrow="Admin"
      title="User Management"
      description="Monitor user activities, review reports, and enforce platform policies."
      metrics={[
        { label: 'Total Users', value: '9,402' },
        { label: 'New This Week', value: '186' },
        { label: 'Flagged Accounts', value: '12' },
      ]}
      primaryAction="Suspend Selected"
    />
  );
};

export default UserManagementPage;
