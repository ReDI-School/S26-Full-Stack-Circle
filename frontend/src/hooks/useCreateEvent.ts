'use client';

import { Temporal } from '@js-temporal/polyfill';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type CreateEventInput } from '@validators/schemas';
import { type FormData } from '@components/CreateEventForm/CreateEventForm.types';

export default function useCreateEvent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>(undefined);

  const createEvent = async (formData: FormData) => {
    setIsLoading(true);
    setServerError(undefined);

    try {
      const utcDate = Temporal.PlainDateTime.from(`${formData.date}T${formData.time}`)
        .toZonedDateTime(Temporal.Now.timeZoneId())
        .toInstant()
        .toString();

      const payload: CreateEventInput = {
        ...formData,
        date: utcDate,
        location: 'Online',
      };
      const response = await fetch('/api/events', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create event. Please try again.');
      }

      const newEventId = result.event?.id || result.id;

      if (newEventId) {
        router.push(`/events/${newEventId}`);
      } else {
        router.push('/');
      }

      return true;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
      setServerError(errorMessage);
      console.error('Event creation failed:', errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { createEvent, isLoading, serverError };
}
