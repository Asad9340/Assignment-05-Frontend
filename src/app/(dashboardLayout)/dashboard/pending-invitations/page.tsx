import StaticPageShell from '@/components/modules/Dashboard/StaticPageShell';
import {
  extractArrayPayload,
  mapInvitation,
  mapParticipation,
} from '@/lib/apiMappers';
import { platformServices } from '@/services/platform.services';

const PendingInvitationsPage = async () => {
  let invitations = [] as ReturnType<typeof mapInvitation>[];
  let participations = [] as ReturnType<typeof mapParticipation>[];

  try {
    const [invitationResponse, participationResponse] = await Promise.all([
      platformServices.getMyInvitations(),
      platformServices.getMyParticipations(),
    ]);

    invitations = extractArrayPayload(invitationResponse.data).map(item =>
      mapInvitation(item),
    );
    participations = extractArrayPayload(participationResponse.data).map(item =>
      mapParticipation(item),
    );
  } catch {
    invitations = [];
    participations = [];
  }

  const pendingInvites = invitations.filter(
    invitation => invitation.status.toUpperCase() === 'PENDING',
  );
  const paidPending = participations.filter(
    participation =>
      participation.status.toUpperCase().includes('PENDING') &&
      participation.paymentStatus.toUpperCase() === 'PAID',
  );

  return (
    <StaticPageShell
      eyebrow="Dashboard"
      title="Pending Invitations"
      description="Track invitations waiting for host approval after payment or private join requests."
      metrics={[
        { label: 'Pending Approval', value: String(pendingInvites.length) },
        { label: 'Paid Requests', value: String(paidPending.length) },
      ]}
    >
      <div className="space-y-3">
        {pendingInvites.slice(0, 6).map(invitation => (
          <div
            key={invitation.id}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <p className="font-semibold text-slate-900">
              {invitation.eventTitle}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Waiting for host decision
            </p>
          </div>
        ))}
        {pendingInvites.length === 0 ? (
          <p className="text-sm text-slate-500">
            No pending invitations at this moment.
          </p>
        ) : null}
      </div>
    </StaticPageShell>
  );
};

export default PendingInvitationsPage;
