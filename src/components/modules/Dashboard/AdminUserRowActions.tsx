'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { updateAdminUserAction } from '@/app/(dashboardLayout)/admin/dashboard/users/users.actions';

type AdminUserRowActionsProps = {
  userId: string;
  status: string;
  role?: string;
  onStatusUpdated?: (userId: string, nextStatus: 'ACTIVE' | 'BLOCKED') => void;
  onRoleUpdated?: (userId: string, nextRole: 'ADMIN' | 'USER') => void;
};

const AdminUserRowActions = ({
  userId,
  status,
  role,
  onStatusUpdated,
  onRoleUpdated,
}: AdminUserRowActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const [selectedStatus, setSelectedStatus] = useState(
    status.toUpperCase() === 'BLOCKED' ? 'BLOCKED' : 'ACTIVE',
  );
  const [selectedRole, setSelectedRole] = useState(
    role?.toUpperCase() === 'ADMIN' ? 'ADMIN' : 'USER',
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
          role: selectedRole as 'ADMIN' | 'USER',
        });

        if (!response.success) {
          throw new Error(response.error || 'Failed to update user status');
        }

        setFeedback({
          type: 'success',
          message: 'User role and status updated successfully.',
        });
        onStatusUpdated?.(userId, selectedStatus as 'ACTIVE' | 'BLOCKED');
        onRoleUpdated?.(userId, selectedRole as 'ADMIN' | 'USER');
      } catch {
        setFeedback({
          type: 'error',
          message: 'Failed to update user role or status.',
        });
      }
    });
  };

  if (isAdminUser) {
    return (
      <div className="space-y-2">
        <p className="text-xs font-semibold text-rose-500">
          Admin accounts cannot have their role or status modified by another
          admin.
        </p>
        <div className="flex flex-wrap gap-2">
          <p className="flex h-9 items-center rounded-md border border-slate-200 bg-slate-50 px-2 text-xs font-semibold text-slate-500">
            Role: ADMIN
          </p>
          <p className="flex h-9 items-center rounded-md border border-slate-200 bg-slate-50 px-2 text-xs font-semibold text-slate-500">
            Status: {normalizedStatus}
          </p>
        </div>
      </div>
    );
  }

  const isStatusUnchanged = selectedStatus === normalizedStatus;
  const isRoleUnchanged = selectedRole === (normalizedRole || 'USER');

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <p className="flex h-9 items-center rounded-md border border-slate-200 px-2 text-xs font-semibold text-slate-600">
          Current: {normalizedStatus}
        </p>
        <select
          className="h-9 rounded-md border border-slate-300 px-2 text-sm"
          value={selectedStatus}
          disabled={isPending}
          onChange={event => setSelectedStatus(event.target.value)}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="BLOCKED">BLOCKED</option>
        </select>
        <select
          className="h-9 rounded-md border border-slate-300 px-2 text-sm"
          value={selectedRole}
          disabled={isPending}
          onChange={event => setSelectedRole(event.target.value)}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={isPending || (isStatusUnchanged && isRoleUnchanged)}
          onClick={runAction}
        >
          Update User
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
