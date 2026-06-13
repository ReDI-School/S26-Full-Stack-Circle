'use client';

import { useCallback, useEffect, useState } from 'react';
import { getDashboardEvents, joinEvent, leaveEvent } from '@services/eventService';

export type TabType = 'all' | 'future' | 'archived';

export type Relationship = 'author' | 'joined' | 'none';

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  relationship: Relationship;
  attendeeCount?: number;
  maxAttendees?: number;
  author?: string;
}

export function useDashboardEvents(tab: TabType) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState<Set<string>>(new Set());
  const [prevTab, setPrevTab] = useState<TabType>(tab);

  // Synchronous state reset when tab changes (avoids cascading render flash)
  if (tab !== prevTab) {
    setPrevTab(tab);
    setLoading(true);
  }

// Effect for handling race-condition free data fetching on tab changes
  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await getDashboardEvents(tab);
        if (active) {
          setEvents(data);
        }
      } catch (err) {
        console.error('Failed to load events:', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [tab]);

  const join = async (eventId: string) => {
    setPending((prev) => new Set(prev).add(eventId));

    const prev = events;

    setEvents((curr) =>
      curr.map((e) =>
        e.id === eventId
          ? {
              ...e,
              relationship: 'joined',
              attendeeCount: (e.attendeeCount ?? 0) + 1,
            }
          : e
      )
    );

    try {
      await joinEvent(eventId);
    } catch (err) {
      setEvents(prev);
      throw err;
    } finally {
      setPending((prev) => {
        const next = new Set(prev);
        next.delete(eventId);
        return next;
      });
    }
  };

  const leave = async (eventId: string) => {
    setPending((prev) => new Set(prev).add(eventId));

    const prev = events;

    setEvents((curr) =>
      curr.map((e) =>
        e.id === eventId
          ? {
              ...e,
              relationship: 'none',
              attendeeCount: Math.max(0, (e.attendeeCount ?? 0) - 1),
            }
          : e
      )
    );

    try {
      await leaveEvent(eventId);
    } catch (err) {
      setEvents(prev);
      throw err;
    } finally {
      setPending((prev) => {
        const next = new Set(prev);
        next.delete(eventId);
        return next;
      });
    }
  };

   const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDashboardEvents(tab);
      setEvents(data);
    } catch (err) {
      console.error('Failed to refetch events:', err);
    } finally {
      setLoading(false);
    }
  }, [tab]);


  return {
    events,
    loading,
    pending,
    join,
    leave,
    refetch,
  };
}
