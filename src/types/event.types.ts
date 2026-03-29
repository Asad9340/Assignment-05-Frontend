export type EventVisibility = 'PUBLIC' | 'PRIVATE' | string;
export type EventFeeType = 'FREE' | 'PAID' | string;

export interface EventViewModel {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  visibility: EventVisibility;
  feeType: EventFeeType;
  registrationFee: number;
  organizerName: string;
}

export interface ReviewViewModel {
  id: string;
  rating: number;
  review: string;
  userName: string;
  createdAt: string;
}

export interface InvitationViewModel {
  id: string;
  status: string;
  eventTitle: string;
  eventId: string;
  createdAt: string;
}

export interface ParticipationViewModel {
  id: string;
  status: string;
  paymentStatus: string;
  eventTitle: string;
  eventId: string;
  registrationFee: number;
  createdAt: string;
}
