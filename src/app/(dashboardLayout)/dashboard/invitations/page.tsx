import StaticPageShell from '@/components/modules/Dashboard/StaticPageShell';
import { extractArrayPayload, mapInvitation } from '@/lib/apiMappers';
import { platformServices } from '@/services/platform.services';

const InvitationsPage = async () => {
  let invitations = [] as ReturnType<typeof mapInvitation>[];

  try {
    const response = await platformServices.getMyInvitations();
    invitations = extractArrayPayload(response.data).map(item =>
      mapInvitation(item),
    );
  } catch {
    invitations = [];
  }

  const pending = invitations.filter(
    invitation => invitation.status.toUpperCase() === 'PENDING',
  ).length;

  return (
    <StaticPageShell
      eyebrow="Dashboard"
      title="Invitations"
      description="Review event invitations, including paid and private invites, and respond quickly."
      metrics={[
        { label: 'Total Invites', value: String(invitations.length) },
        { label: 'Awaiting Response', value: String(pending) },
      ]}
      primaryAction="Accept Invite"
      secondaryAction="Decline Invite"
    >
      <div className="space-y-3">
        {invitations.slice(0, 6).map(invitation => (
          <div
            key={invitation.id}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <p className="font-semibold text-slate-900">
              {invitation.eventTitle}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Status: {invitation.status}
            </p>
          </div>
        ))}
        {invitations.length === 0 ? (
          <p className="text-sm text-slate-500">No invitations found.</p>
        ) : null}
      </div>
    </StaticPageShell>
  );
};

export default InvitationsPage;
