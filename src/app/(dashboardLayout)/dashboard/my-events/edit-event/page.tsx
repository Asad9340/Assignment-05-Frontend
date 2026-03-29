import StaticPageShell from '@/components/modules/Dashboard/StaticPageShell';

const EditMyEventPage = () => {
  return (
    <StaticPageShell
      eyebrow="My Events"
      title="Edit Event"
      description="Update event details, registration fee, visibility, and timeline without losing participant history."
      primaryAction="Save Changes"
      secondaryAction="Delete Event"
    />
  );
};

export default EditMyEventPage;
