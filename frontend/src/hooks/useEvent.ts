'use client';

import { useEffect, useState } from 'react';
import { fetchEventById } from '@services/eventService';
import { EventData, Attendance } from '../types/event';
import { EventCardAction } from '@components/EventCard/EventCard.types';
import { joinEvent, leaveEvent } from '@services/eventService';

export default function useEvent({ id }: { id: string }) {
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isAtending, setIsAtending] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    async function loadEvent() {
      setLoading(true);
      setError(null);

      try {
        const rawEvent = await fetchEventById(id);

        const formatedEvent: EventData = {
          id: rawEvent.id,
          title: rawEvent.title,
          description: rawEvent.description,
          date: new Date(rawEvent.date),
          location: rawEvent.location,
          capacity: rawEvent.capacity,
          organizer: `${rawEvent.organizer.firstName} ${rawEvent.organizer.lastName}`,
          attendeeCount: rawEvent.attendances.length,
          attendees: rawEvent.attendances.map(
            (attendance: Attendance) => `${attendance.user.firstName} ${attendance.user.lastName}`
          ),
          attendances: rawEvent.attendances,
        };
        setEvent(formatedEvent);
        setIsOwner(rawEvent.isOwner);
        setIsAtending(rawEvent.isAtending);
        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setLoading(false);
      }
    }

    loadEvent();
  }, [id, isAtending]);

  const action: EventCardAction = isOwner ? 'edit' : isAtending ? 'leave' : 'join';

  const handleAction = async () => {
    try {
      if (action === 'join') {
        await joinEvent(id);
        setIsAtending(true);
      } else if (action === 'leave') {
        await leaveEvent(id);
        setIsAtending(false);
      }
      // edit se maneja diferente, requiere form modal
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    }
  };

  return { event, loading, error, action, handleAction };
}
