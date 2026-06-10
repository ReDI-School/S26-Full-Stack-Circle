'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchEventById } from '@services/eventService';
import { EventData, Attendance } from '../types/event';
import { EventCardAction } from '@components/EventCard/EventCard.types';
import { joinEvent, leaveEvent } from '@services/eventService';
import useAuth from './useAuth';

export default function useEvent({ id }: { id: string }) {
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isAttending, setIsAtending] = useState<boolean>(false);
  const { user } = useAuth();
  const router = useRouter();

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
        setIsAtending(rawEvent.isAttending);
        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  const action: EventCardAction = isOwner ? 'edit' : isAttending ? 'leave' : 'join';

  const handleAction = async () => {
    const previousState = isAttending;
    const previousEvent = event;

    try {
      if (action === 'edit' && event && user) {
        router.push(`/events/update-${id}`);
      } else if (action === 'join' && event && user) {
        const userTag = `${user.firstName} ${user.lastName}`;
        setIsAtending(true);
        setEvent({
          ...event,
          attendeeCount: event.attendeeCount + 1,
          attendees: [...event.attendees, userTag],
        });
        await joinEvent(id);
      } else if (action === 'leave' && event && user) {
        const userTag = `${user.firstName} ${user.lastName}`;
        setIsAtending(false);
        setEvent({
          ...event,
          attendeeCount: event.attendeeCount - 1,
          attendees: event.attendees.filter((name) => name !== userTag),
        });
        await leaveEvent(id);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setIsAtending(previousState);
      setEvent(previousEvent);
    }
  };

  return { event, loading, error, action, handleAction };
}
