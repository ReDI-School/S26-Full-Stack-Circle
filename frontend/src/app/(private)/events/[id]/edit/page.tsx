import { config } from '@config';
import { cookies } from 'next/headers';
import EditEventFormClient from './EditEventFormClient';

type EditEventPageProps = {
  params?: Promise<{ id: string }>;
  searchParams?: Promise<{ timezone?: string }>;
};

export type UpdateEventPayload = {
  title: string;
  description: string;
  date: string;
  time: string;
  timezone: string;
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

function getAuthCookieHeader(token?: string) {
  const headers: HeadersInit = {};

  if (token) {
    headers.Cookie = `token=${token}`;
  }

  return headers;
}

export default async function EditEventPage({ params, searchParams }: EditEventPageProps = {}) {
  const id = params ? (await params).id : undefined;
  const eventHref = id ? `/events/${id}` : '/events';
  const timezone = searchParams ? (await searchParams).timezone : undefined;

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
        ...getAuthCookieHeader(actionToken),
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
        ...getAuthCookieHeader(actionToken),
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
    const query = timezone ? `?${new URLSearchParams({ timezone }).toString()}` : '';
    const res = await fetch(`${apiUrl}/events/${id}${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthCookieHeader(token),
      },
      cache: 'no-store',
    });

    const data = res.ok ? await res.json() : {};
    const event = data.event ?? {};

    initialEvent = {
      title: event.title ?? '',
      date: event.formDate ?? '',
      time: event.formTime ?? '',
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
