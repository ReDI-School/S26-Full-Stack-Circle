import { Attendance } from '../types/event';

function getHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
  };
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
    headers: getHeaders(),
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
