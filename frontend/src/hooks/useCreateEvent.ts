'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
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
      const payload: CreateEventInput = {
        ...formData,
        location: 'Online',
      };

      const token = Cookies.get('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${baseUrl}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
