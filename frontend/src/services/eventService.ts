import { Attendance } from '../types/event';

function getHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
  };
}

function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
}

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

export async function getDashboardEvents(tab: 'all' | 'future' | 'archived') {
  const filter = tab === 'future' ? 'upcoming' : tab === 'archived' ? 'past' : '';

  const url = filter ? `${getApiUrl()}/events?filter=${filter}` : `${getApiUrl()}/events`;

  const res = await fetch(url, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch events');

  const data = await res.json();

  return Array.isArray(data) ? data : data.events;
}

export async function fetchEventById(id: string): Promise<RawEvent> {
  const url = `${getApiUrl()}/events/${id}`;
  const res = await fetch(url, {
    headers: getHeaders(),
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch event: ${res.status}`);
  }

  const { event } = await res.json();
  return event;
}

export async function joinEvent(eventId: string): Promise<RawEvent> {
  const url = `${getApiUrl()}/events/${eventId}/attend`;
  const res = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`Failed to join event: ${res.status}`);
  }

  const { event } = await res.json();
  return event;
}

export async function leaveEvent(eventId: string): Promise<void> {
  const url = `${getApiUrl()}/events/${eventId}/attend`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`Failed to leave event: ${res.status}`);
  }
}

export async function updateEvent(id: string, updates: Partial<RawEvent>): Promise<RawEvent> {
  const url = `${getApiUrl()}/events/${id}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { ...getHeaders(), 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error(`Failed to update event: ${res.status}`);
  }

  const { event } = await res.json();
  return event;
}
