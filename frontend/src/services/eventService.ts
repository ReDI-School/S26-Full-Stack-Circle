import { Attendance } from '../types/event';

function getHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
  };
}

export type ProfileTab = 'created' | 'going' | 'archived';

const TAB_TO_FILTER: Record<ProfileTab, 'created' | 'attending' | 'archived'> = {
  created: 'created',
  going: 'attending',
  archived: 'archived',
};

export type RawProfileEvent = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string;
  capacity: number;
  organizerId: string;
  organizer: { firstName: string; lastName: string };
  _count: { attendances: number };
};

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

export type RawEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  organizer: {
    id: string;
    firstName: string;
    lastName: string;
  };
  attendances: Attendance[];
  isOwner: boolean;
  isAttending: boolean;
};

function toProfileEvent(event: RawProfileEvent, status: ProfileTab): ProfileEvent {
  return {
    id: event.id,
    status,
    date: new Date(event.date),
    title: event.title,
    author: `${event.organizer.firstName} ${event.organizer.lastName}`,
    description: event.description ?? '',
    attendeeCount: event._count.attendances,
    maxAttendees: event.capacity,
  };
}

export async function fetchUserEvents(tab: ProfileTab): Promise<ProfileEvent[]> {
  const res = await fetch(`/api/events/user/events?filter=${TAB_TO_FILTER[tab]}`, {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch user events: ${res.status}`);
  const { events } = await res.json();
  return (events as RawProfileEvent[]).map((e) => toProfileEvent(e, tab));
}

export async function getDashboardEvents(tab: 'all' | 'future' | 'archived') {
  const filter = tab === 'future' ? 'upcoming' : tab === 'archived' ? 'past' : '';
  const url = filter ? `/api/events?filter=${filter}` : `/api/events`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch events');

  const data = await res.json();
  return Array.isArray(data) ? data : data.events;
}

export async function fetchEventById(id: string): Promise<RawEvent> {
  const res = await fetch(`/api/events/${id}`, {
    headers: getHeaders(),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch event: ${res.status}`);
  }

  const { event } = await res.json();
  return event;
}

export async function joinEvent(eventId: string): Promise<RawEvent> {
  const res = await fetch(`/api/events/${eventId}/attend`, {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error(`Failed to join event: ${res.status}`);
  }

  const { event } = await res.json();
  return event;
}

export async function leaveEvent(eventId: string): Promise<void> {
  const res = await fetch(`/api/events/${eventId}/attend`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Failed to leave event: ${res.status}`);
  }
}

export async function updateEvent(id: string, updates: Partial<RawEvent>): Promise<RawEvent> {
  const res = await fetch(`/api/events/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error(`Failed to update event: ${res.status}`);
  }

  const { event } = await res.json();
  return event;
}
