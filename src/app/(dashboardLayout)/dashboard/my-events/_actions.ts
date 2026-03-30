'use server';

import { revalidatePath } from 'next/cache';
import { serverHttpClient } from '@/lib/axios/serverHttpClient';

export type MyEventPayload = {
  title: string;
  description: string;
  eventDate: string;
  eventTime: string;
  venue?: string;
  eventLink?: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  registrationFee?: number;
};

export type ActionResult = {
  success: boolean;
  message: string;
  eventId?: string;
};

export type SearchInviteUsersResult = {
  success: boolean;
  message: string;
  data: Array<{
    id: string;
    name: string;
    email: string;
    image?: string;
  }>;
};

const toValidUrl = (value?: string) => {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  const normalized = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const url = new URL(normalized);
    return url.toString();
  } catch {
    return null;
  }
};

const normalizePayload = (payload: MyEventPayload) => {
  const normalizedFee = Number(payload.registrationFee || 0);
  const normalizedEventLink = toValidUrl(payload.eventLink);
  const normalizedVenue = payload.venue?.trim() || undefined;

  const eventLink =
    normalizedEventLink && normalizedEventLink !== null
      ? normalizedEventLink
      : undefined;

  return {
    title: payload.title.trim(),
    description: payload.description.trim(),
    eventDate: payload.eventDate,
    eventTime: payload.eventTime,
    venue: normalizedVenue,
    eventLink,
    visibility: payload.visibility,
    registrationFee: Number.isFinite(normalizedFee)
      ? Math.max(0, normalizedFee)
      : 0,
  };
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (!error || typeof error !== 'object') {
    return fallback;
  }

  const errorRecord = error as {
    response?: {
      data?: {
        message?: string;
        errorSources?: Array<{
          message?: string;
        }>;
      };
    };
  };

  const firstErrorSourceMessage =
    errorRecord.response?.data?.errorSources?.[0]?.message;

  return (
    firstErrorSourceMessage || errorRecord.response?.data?.message || fallback
  );
};

export const createMyEventAction = async (
  payload: MyEventPayload,
): Promise<ActionResult> => {
  const body = normalizePayload(payload);

  if (!body.title || body.title.length < 3) {
    return {
      success: false,
      message: 'Title must be at least 3 characters.',
    };
  }

  if (!body.description || body.description.length < 10) {
    return {
      success: false,
      message: 'Description must be at least 10 characters.',
    };
  }

  if (!body.eventDate || !body.eventTime) {
    return {
      success: false,
      message: 'Event date and time are required.',
    };
  }

  if (!body.venue && !body.eventLink) {
    return {
      success: false,
      message: 'Either venue or event link is required.',
    };
  }

  if (
    !body.venue &&
    payload.eventLink &&
    toValidUrl(payload.eventLink) === null
  ) {
    return {
      success: false,
      message: 'Event link must be a valid URL.',
    };
  }

  try {
    const response = await serverHttpClient.post<{ id: string }>(
      '/events',
      body,
    );

    revalidatePath('/dashboard/my-events');

    return {
      success: true,
      message: 'Event created successfully.',
      eventId: response.data?.id,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, 'Failed to create event.'),
    };
  }
};

export const updateMyEventAction = async (
  eventId: string,
  payload: MyEventPayload,
): Promise<ActionResult> => {
  const body = normalizePayload(payload);

  if (!body.title || body.title.length < 3) {
    return {
      success: false,
      message: 'Title must be at least 3 characters.',
    };
  }

  if (!body.description || body.description.length < 10) {
    return {
      success: false,
      message: 'Description must be at least 10 characters.',
    };
  }

  if (!body.eventDate || !body.eventTime) {
    return {
      success: false,
      message: 'Event date and time are required.',
    };
  }

  if (!body.venue && !body.eventLink) {
    return {
      success: false,
      message: 'Either venue or event link is required.',
    };
  }

  if (
    !body.venue &&
    payload.eventLink &&
    toValidUrl(payload.eventLink) === null
  ) {
    return {
      success: false,
      message: 'Event link must be a valid URL.',
    };
  }

  try {
    await serverHttpClient.patch(`/events/${eventId}`, body);

    revalidatePath('/dashboard/my-events');
    revalidatePath(`/dashboard/my-events/${eventId}`);

    return {
      success: true,
      message: 'Event updated successfully.',
      eventId,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, 'Failed to update event.'),
    };
  }
};

export const updateMyEventStatusAction = async (
  eventId: string,
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED',
): Promise<ActionResult> => {
  try {
    await serverHttpClient.patch(`/events/${eventId}`, { status });

    revalidatePath('/dashboard/my-events');
    revalidatePath('/dashboard/my-events/approvals');
    revalidatePath(`/dashboard/my-events/${eventId}`);

    return {
      success: true,
      message: 'Event status updated successfully.',
      eventId,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, 'Failed to update event status.'),
    };
  }
};

export const deleteMyEventAction = async (
  eventId: string,
): Promise<ActionResult> => {
  try {
    await serverHttpClient.delete(`/events/${eventId}`);

    revalidatePath('/dashboard/my-events');

    return {
      success: true,
      message: 'Event deleted successfully.',
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, 'Failed to delete event.'),
    };
  }
};

export const updateParticipantStateAction = async (
  participantId: string,
  action: 'accept' | 'approve' | 'reject' | 'ban',
): Promise<ActionResult> => {
  try {
    await serverHttpClient.patch(
      `/participations/${participantId}/${action}`,
      {},
    );

    revalidatePath('/dashboard/my-events/approvals');

    return {
      success: true,
      message:
        action === 'accept' || action === 'approve'
          ? 'Participant accepted and joined successfully.'
          : action === 'reject'
            ? 'Participant rejected successfully.'
            : 'Participant banned successfully.',
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, `Failed to ${action} participant.`),
    };
  }
};

export const inviteUserToEventAction = async (
  eventId: string,
  userId: string,
): Promise<ActionResult> => {
  try {
    await serverHttpClient.post(`/invitations/events/${eventId}`, { userId });

    return {
      success: true,
      message: 'Invitation sent successfully.',
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, 'Failed to send invitation.'),
    };
  }
};

export const searchUsersForInvitationAction = async (
  eventId: string,
  searchTerm?: string,
): Promise<SearchInviteUsersResult> => {
  try {
    const response = await serverHttpClient.get<
      Array<{
        id: string;
        name: string;
        email: string;
        image?: string;
      }>
    >('/users/search', {
      params: {
        eventId,
        searchTerm: searchTerm?.trim() || undefined,
        limit: 12,
      },
    });

    return {
      success: true,
      message: 'Users retrieved successfully.',
      data: Array.isArray(response.data) ? response.data : [],
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, 'Failed to search users.'),
      data: [],
    };
  }
};
