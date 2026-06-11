// Mock data and utility functions for the profile page, simulating backend responses for created, going, and archived events.

export type ProfileTab = 'created' | 'going' | 'archived';

export type NameParts = {
  firstName: string;
  lastName: string;
};

export type MockUser = NameParts & {
  id: string;
  email: string;
};

export type BackendEvent = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string;
  capacity: number;
  organizerId: string;
  createdAt: string;
  updatedAt: string;
  organizer: NameParts;
};

export type Attendee = NameParts;

export type ProfileEvent = {
  id: string;
  status: ProfileTab;
  date: Date;
  title: string;
  author: string;
  description: string;
  attendeeCount: number;
  maxAttendees: number;
};

export const mockProfileUser: MockUser = {
  id: 'b0ef0ed6-0f63-4723-9211-d2f62cb9a0b7',
  email: 'name@example.com',
  firstName: 'Fabio',
  lastName: 'Rodriguez',
};

export const mockCreatedEvents: BackendEvent[] = [
  {
    id: '896fc1a9-0a55-4c26-aef7-f6f57e332ad4',
    title: 'Tech Meetup 2026',
    description: 'A networking event for developers and tech enthusiasts.',
    date: '2026-07-15T00:00:00.000Z',
    location: 'Berlin Conference Center',
    capacity: 100,
    organizerId: 'b0ef0ed6-0f63-4723-9211-d2f62cb9a0b7',
    createdAt: '2026-06-02T08:03:07.771Z',
    updatedAt: '2026-06-02T08:03:07.771Z',
    organizer: {
      firstName: 'Fabio',
      lastName: 'Rodriguez',
    },
  },
  {
    id: 'd9c841c1-0719-4611-b437-a7b775327718',
    title: 'Startup Pitch Night',
    description:
      'An evening where early-stage founders pitch their ideas to investors and mentors.',
    date: '2026-08-10T00:00:00.000Z',
    location: 'Factory Berlin',
    capacity: 80,
    organizerId: 'b0ef0ed6-0f63-4723-9211-d2f62cb9a0b7',
    createdAt: '2026-06-02T08:05:15.245Z',
    updatedAt: '2026-06-02T08:05:15.245Z',
    organizer: {
      firstName: 'Fabio',
      lastName: 'Rodriguez',
    },
  },
];

export const mockGoingEvents: BackendEvent[] = [
  {
    id: '7fdff9e2-91a1-4012-bd10-111111111111',
    title: 'React Beginners Circle',
    description: 'A practical session for people learning React and component-based UI.',
    date: '2026-09-12T00:00:00.000Z',
    location: 'ReDI School Berlin',
    capacity: 50,
    organizerId: 'another-user-id-1',
    createdAt: '2026-06-02T08:10:00.000Z',
    updatedAt: '2026-06-02T08:10:00.000Z',
    organizer: {
      firstName: 'Jane',
      lastName: 'Smith',
    },
  },
  {
    id: '8aa3e68f-4f79-4f34-a616-222222222222',
    title: 'Career Networking Evening',
    description: 'Meet mentors, recruiters, and other learners in the Berlin tech community.',
    date: '2026-11-20T00:00:00.000Z',
    location: 'Berlin Tech Hub',
    capacity: 120,
    organizerId: 'another-user-id-2',
    createdAt: '2026-06-02T08:15:00.000Z',
    updatedAt: '2026-06-02T08:15:00.000Z',
    organizer: {
      firstName: 'Anna',
      lastName: 'Müller',
    },
  },
];

export const mockArchivedEvents: BackendEvent[] = [
  {
    id: 'cdee81b6-e03d-420c-923e-687fed77073d',
    title: 'Design Systems Workshop',
    description: 'A hands-on workshop about building scalable design systems for modern web apps.',
    date: '2025-09-05T00:00:00.000Z',
    location: 'Berlin Creative Hub',
    capacity: 40,
    organizerId: 'b0ef0ed6-0f63-4723-9211-d2f62cb9a0b7',
    createdAt: '2026-06-02T08:05:55.614Z',
    updatedAt: '2026-06-02T08:05:55.614Z',
    organizer: {
      firstName: 'Fabio',
      lastName: 'Rodriguez',
    },
  },
  {
    id: '1b9923cb-d6ac-4f00-baaa-333333333333',
    title: 'Past JavaScript Study Group',
    description: 'A completed study group covering JavaScript fundamentals and DOM practice.',
    date: '2025-04-18T00:00:00.000Z',
    location: 'Online',
    capacity: 30,
    organizerId: 'another-user-id-3',
    createdAt: '2025-03-01T10:00:00.000Z',
    updatedAt: '2025-03-01T10:00:00.000Z',
    organizer: {
      firstName: 'David',
      lastName: 'Kim',
    },
  },
];

export const mockAttendeesByEventId: Record<string, Attendee[]> = {
  '896fc1a9-0a55-4c26-aef7-f6f57e332ad4': [
    { firstName: 'Fabio', lastName: 'Rodriguez' },
    { firstName: 'Jane', lastName: 'Smith' },
    { firstName: 'Michael', lastName: 'Brown' },
  ],
  'd9c841c1-0719-4611-b437-a7b775327718': [
    { firstName: 'Fabio', lastName: 'Rodriguez' },
    { firstName: 'Anna', lastName: 'Müller' },
  ],
  'cdee81b6-e03d-420c-923e-687fed77073d': [
    { firstName: 'Fabio', lastName: 'Rodriguez' },
    { firstName: 'Sara', lastName: 'Lee' },
    { firstName: 'David', lastName: 'Kim' },
  ],
  '7fdff9e2-91a1-4012-bd10-111111111111': [
    { firstName: 'Fabio', lastName: 'Rodriguez' },
    { firstName: 'Lukas', lastName: 'Weber' },
  ],
  '8aa3e68f-4f79-4f34-a616-222222222222': [
    { firstName: 'Clara', lastName: 'Schmidt' },
    { firstName: 'Noah', lastName: 'Becker' },
  ],
  '1b9923cb-d6ac-4f00-baaa-333333333333': [
    { firstName: 'Fabio', lastName: 'Rodriguez' },
    { firstName: 'David', lastName: 'Kim' },
  ],
};

export const getAttendeesForEvent = (eventId: string) => {
  return mockAttendeesByEventId[eventId] ?? [];
};

export const getUserFullName = (user: NameParts) => {
  return `${user.firstName} ${user.lastName}`;
};

export const getProfileEventCounts = () => {
  return {
    authoredEvents: mockCreatedEvents.length,
    goingToEvents: mockGoingEvents.length,
    participatedEvents: mockArchivedEvents.length,
  };
};

const toProfileEvent = (event: BackendEvent, status: ProfileTab): ProfileEvent => {
  return {
    id: event.id,
    status,
    date: new Date(event.date),
    title: event.title,
    author: getUserFullName(event.organizer),
    description: event.description ?? '',
    attendeeCount: getAttendeesForEvent(event.id).length,
    maxAttendees: event.capacity,
  };
};

export const getCreatedProfileEvents = () => {
  return mockCreatedEvents.map((event) => toProfileEvent(event, 'created'));
};

export const getGoingProfileEvents = () => {
  return mockGoingEvents.map((event) => toProfileEvent(event, 'going'));
};

export const getArchivedProfileEvents = () => {
  return mockArchivedEvents.map((event) => toProfileEvent(event, 'archived'));
};

export const getMockProfileEvents = () => {
  return {
    created: getCreatedProfileEvents(),
    going: getGoingProfileEvents(),
    archived: getArchivedProfileEvents(),
  };
};

// Utility for simulating network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchCreatedProfileEvents = async () => {
  await delay(800); // 800ms fake delay
  return getCreatedProfileEvents();
};

export const fetchGoingProfileEvents = async () => {
  await delay(800);
  return getGoingProfileEvents();
};

export const fetchArchivedProfileEvents = async () => {
  await delay(800);
  return getArchivedProfileEvents();
};

export const fetchProfileEventsByTab = async (tab: ProfileTab) => {
  // You can also add randomized error throwing here later to test your error UI
  if (tab === 'created') {
    return fetchCreatedProfileEvents();
  }

  if (tab === 'going') {
    return fetchGoingProfileEvents();
  }

  return fetchArchivedProfileEvents();
};
