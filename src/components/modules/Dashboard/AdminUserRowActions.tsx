'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { updateAdminUserAction } from '@/app/(dashboardLayout)/admin/dashboard/users/users.actions';

type AdminUserRowActionsProps = {
  userId: string;
  status: string;
  role?: string;
  onStatusUpdated?: (userId: string, nextStatus: 'ACTIVE' | 'BLOCKED') => void;
};

const AdminUserRowActions = ({
  userId,
  status,
  role,
  onStatusUpdated,
}: AdminUserRowActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const [selectedStatus, setSelectedStatus] = useState(
    status.toUpperCase() === 'BLOCKED' ? 'BLOCKED' : 'ACTIVE',
  );
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const normalizedStatus = status.toUpperCase();
  const normalizedRole = (role || '').toUpperCase();
  const isAdminUser = normalizedRole === 'ADMIN';

  const runAction = () => {
    setFeedback(null);

    startTransition(async () => {
      try {
        const response = await updateAdminUserAction(userId, {
          status: selectedStatus as 'ACTIVE' | 'BLOCKED',
        });

        if (!response.success) {
          throw new Error(response.error || 'Failed to update user status');
        }

        setFeedback({
          type: 'success',
          message: 'User status updated successfully.',
        });
        onStatusUpdated?.(userId, selectedStatus as 'ACTIVE' | 'BLOCKED');
      } catch {
        setFeedback({
          type: 'error',
          message: 'Failed to update user status.',
        });
      }
    });
  };

  return (
    <div className="space-y-2">
      {isAdminUser ? (
        <p className="text-xs font-semibold text-slate-500">
          Admin account status is restricted.
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <p className="flex h-9 items-center rounded-md border border-slate-200 px-2 text-xs font-semibold text-slate-600">
          Current: {normalizedStatus}
        </p>
        <select
          className="h-9 rounded-md border border-slate-300 px-2 text-sm"
          value={selectedStatus}
          disabled={isPending || isAdminUser}
          onChange={event => setSelectedStatus(event.target.value)}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="BLOCKED">BLOCKED</option>
        </select>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={
            isPending || isAdminUser || selectedStatus === normalizedStatus
          }
          onClick={runAction}
        >
          Update Status
        </Button>
      </div>
      {feedback ? (
        <p
          className={`text-xs ${
            feedback.type === 'success' ? 'text-emerald-700' : 'text-rose-700'
          }`}
        >
          {feedback.message}
        </p>
      ) : null}
    </div>
  );
};

export default AdminUserRowActions;
