'use client';

import { useEffect, useState } from 'react';
import { fetchEventById } from '@services/eventService';
import type { EventData, Attendance } from '@types/event';
import { EventCardAction } from '@components/EventCard/EventCard.types';

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
        console.log(rawEvent);

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
            (attendance: Attendance) => attendance.user.firstName
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
  }, [id]);

  const action: EventCardAction = isOwner ? 'edit' : isAtending ? 'leave' : 'join';

  return { event, loading, error, action };
}
