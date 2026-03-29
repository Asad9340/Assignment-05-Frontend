/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { getDefaultDashboardRoute, UserRole } from '@/lib/authUtils';
import { httpClient } from '@/lib/axios/httpClient';
import { ApiErrorResponse } from '@/types/api.types';
import { getUserInfo } from '@/services/auth.services';
import {
  IVerifyEmailPayload,
  verifyEmailZodSchema,
} from '@/zod/auth.validation';
import { redirect } from 'next/navigation';

interface VerifyEmailResponse {
  success: boolean;
  message: string;
}

export const verifyEmailAction = async (
  payload: IVerifyEmailPayload,
): Promise<VerifyEmailResponse | ApiErrorResponse> => {
  const parsedPayload = verifyEmailZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError =
      parsedPayload.error.issues[0]?.message || 'Invalid input';
    return {
      success: false,
      message: firstError,
    };
  }

  try {
    await httpClient.post<null>('/auth/verify-email', parsedPayload.data);

    const userInfo = await getUserInfo();
    const role = userInfo?.role as UserRole | undefined;
    const targetPath = role ? getDefaultDashboardRoute(role) : '/dashboard';

    redirect(targetPath);
  } catch (error: any) {
    if (
      error &&
      typeof error === 'object' &&
      'digest' in error &&
      typeof error.digest === 'string' &&
      error.digest.startsWith('NEXT_REDIRECT')
    ) {
      throw error;
    }

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        'Email verification failed',
    };
  }
};
