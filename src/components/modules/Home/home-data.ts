export type EventVisibility = 'Public' | 'Private';
export type EventFeeType = 'Free' | 'Paid';

export type HomeEvent = {
  id: string | number;
  title: string;
  date: string;
  organizer: string;
  visibility: EventVisibility;
  feeType: EventFeeType;
  fee: number;
};

export const featuredEvent: HomeEvent = {
  id: 1,
  title: 'Planora Product Summit 2026',
  date: 'April 18, 2026',
  organizer: 'Planora HQ',
  visibility: 'Public',
  feeType: 'Paid',
  fee: 49,
};

export const upcomingPublicEvents: HomeEvent[] = [
  {
    id: 2,
    title: 'Frontend Master Sprint',
    date: 'April 21, 2026',
    organizer: 'DevGuild',
    visibility: 'Public',
    feeType: 'Free',
    fee: 0,
  },
  {
    id: 3,
    title: 'Backend Scaling Workshop',
    date: 'April 23, 2026',
    organizer: 'Node Circle',
    visibility: 'Public',
    feeType: 'Paid',
    fee: 20,
  },
  {
    id: 4,
    title: 'Open Source Clinic',
    date: 'April 25, 2026',
    organizer: 'OSS Dhaka',
    visibility: 'Public',
    feeType: 'Free',
    fee: 0,
  },
  {
    id: 5,
    title: 'Prisma in Production',
    date: 'April 26, 2026',
    organizer: 'DataForge',
    visibility: 'Public',
    feeType: 'Paid',
    fee: 35,
  },
  {
    id: 6,
    title: 'JWT Security Essentials',
    date: 'April 27, 2026',
    organizer: 'SecureStack',
    visibility: 'Public',
    feeType: 'Free',
    fee: 0,
  },
  {
    id: 7,
    title: 'Event UX Jam',
    date: 'April 29, 2026',
    organizer: 'Product Camp',
    visibility: 'Public',
    feeType: 'Paid',
    fee: 18,
  },
  {
    id: 8,
    title: 'Serverless Day',
    date: 'May 01, 2026',
    organizer: 'CloudLift',
    visibility: 'Public',
    feeType: 'Free',
    fee: 0,
  },
  {
    id: 9,
    title: 'AI for Builders',
    date: 'May 03, 2026',
    organizer: 'Future Lab',
    visibility: 'Public',
    feeType: 'Paid',
    fee: 29,
  },
  {
    id: 10,
    title: 'Community Demo Night',
    date: 'May 05, 2026',
    organizer: 'Planora Community',
    visibility: 'Public',
    feeType: 'Free',
    fee: 0,
  },
];

export const categoryFilters = [
  { label: 'Public Free', value: 'public-free' },
  { label: 'Public Paid', value: 'public-paid' },
  { label: 'Private Free', value: 'private-free' },
  { label: 'Private Paid', value: 'private-paid' },
] as const;
