'use server';

import { revalidatePath } from 'next/cache';
import { serverHttpClient } from '@/lib/axios/serverHttpClient';

export type UpdateProfilePayload = {
  name?: string;
  image?: string;
};

export type UpdateProfileActionResult = {
  success: boolean;
  message: string;
};

const getErrorMessage = (error: unknown): string => {
  if (!error || typeof error !== 'object') {
    return 'Unable to update profile right now. Please try again.';
  }

  const errorRecord = error as {
    response?: {
      data?: {
        message?: string;
      };
    };
  };

  return (
    errorRecord.response?.data?.message ||
    'Unable to update profile right now. Please try again.'
  );
};

export const updateMyProfileAction = async (
  payload: UpdateProfilePayload,
): Promise<UpdateProfileActionResult> => {
  const body: UpdateProfilePayload = {};

  if (typeof payload.name === 'string' && payload.name.trim()) {
    body.name = payload.name.trim();
  }

  if (typeof payload.image === 'string' && payload.image.trim()) {
    body.image = payload.image.trim();
  }

  if (Object.keys(body).length === 0) {
    return {
      success: false,
      message: 'Please provide at least one value to update.',
    };
  }

  try {
    await serverHttpClient.patch('/users/me', body);
    revalidatePath('/my-profile');

    return {
      success: true,
      message: 'Profile updated successfully.',
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};
