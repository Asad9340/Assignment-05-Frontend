import { httpClient } from '@/lib/axios/httpClient';

export const platformServices = {
  getEvents: async (params?: Record<string, unknown>) => {
    return httpClient.get<unknown>('/events', { params });
  },

  getUpcomingEvents: async () => {
    return httpClient.get<unknown>('/events/upcoming');
  },

  getEventById: async (eventId: string) => {
    return httpClient.get<unknown>(`/events/${eventId}`);
  },

  getEventReviews: async (eventId: string) => {
    return httpClient.get<unknown>(`/reviews/events/${eventId}`);
  },

  getMyReviews: async () => {
    return httpClient.get<unknown>('/reviews/me');
  },

  getMyInvitations: async () => {
    return httpClient.get<unknown>('/invitations/me');
  },

  getMyParticipations: async () => {
    return httpClient.get<unknown>('/participations/me');
  },

  joinEvent: async (eventId: string) => {
    return httpClient.post<unknown>(
      `/participations/events/${eventId}/join`,
      {},
    );
  },

  respondInvitation: async (
    invitationId: string,
    action: 'accept' | 'reject',
  ) => {
    return httpClient.patch<unknown>(
      `/invitations/${invitationId}/${action}`,
      {},
    );
  },

  updateParticipationState: async (
    participationId: string,
    action: 'approve' | 'reject' | 'ban',
  ) => {
    return httpClient.patch<unknown>(
      `/participations/${participationId}/${action}`,
      {},
    );
  },
};
