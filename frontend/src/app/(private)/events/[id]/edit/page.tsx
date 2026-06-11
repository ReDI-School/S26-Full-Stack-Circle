import { config } from '@config';
import { cookies } from 'next/headers';
import EditEventFormClient from './EditEventFormClient';

type EditEventPageProps = {
  params?: Promise<{ id: string }>;
};

export type UpdateEventPayload = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
};

export type EventActionResult = {
  ok: boolean;
  error?: string;
};

export type EditEventFormData = {
  title: string;
  date: string;
  time: string;
  capacity: number | '';
  description: string;
  location: string;
};

export default async function EditEventPage({ params }: EditEventPageProps = {}) {
  const id = params ? (await params).id : undefined;
  const eventHref = id ? `/events/${id}` : '/events';

  const { apiUrl } = await config();
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const updateEventAction = async (payload: UpdateEventPayload): Promise<EventActionResult> => {
    'use server';

    if (!id) {
      return { ok: false, error: 'Event id is missing' };
    }

    const { apiUrl: actionApiUrl } = await config();
    const actionCookieStore = await cookies();
    const actionToken = actionCookieStore.get('token')?.value;

    if (!actionToken) {
      return { ok: false, error: 'No token provided. Please log in.' };
    }

    const res = await fetch(`${actionApiUrl}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${actionToken}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { ok: false, error: data?.error || 'Failed to update event' };
    }

    return { ok: true };
  };

  const deleteEventAction = async (): Promise<EventActionResult> => {
    'use server';

    if (!id) {
      return { ok: false, error: 'Event id is missing' };
    }

    const { apiUrl: actionApiUrl } = await config();
    const actionCookieStore = await cookies();
    const actionToken = actionCookieStore.get('token')?.value;

    if (!actionToken) {
      return { ok: false, error: 'No token provided. Please log in.' };
    }

    const res = await fetch(`${actionApiUrl}/events/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${actionToken}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { ok: false, error: data?.error || 'Failed to delete event' };
    }

    return { ok: true };
  };

  let initialEvent: EditEventFormData = {
    title: '',
    date: '',
    time: '',
    capacity: '',
    description: '',
    location: '',
  };

  if (id) {
    const res = await fetch(`${apiUrl}/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: 'no-store',
    });

    const data = res.ok ? await res.json() : {};
    const event = data.event ?? {};

    // Backend stores date like ISO, we take date and time separately
    const rawDate = typeof event.date === 'string' ? event.date : '';
    const datePart = rawDate ? rawDate.slice(0, 10) : '';
    const timePart = rawDate ? rawDate.slice(11, 16) : (event.time ?? '');

    initialEvent = {
      title: event.title ?? '',
      date: datePart,
      time: timePart,
      capacity: event.capacity ?? '',
      description: event.description ?? '',
      location: event.location ?? '',
    };
  }

  return (
    <EditEventFormClient
      eventId={id}
      eventHref={eventHref}
      initialEvent={initialEvent}
      onUpdateEvent={updateEventAction}
      onDeleteEvent={deleteEventAction}
    />
  );
}
