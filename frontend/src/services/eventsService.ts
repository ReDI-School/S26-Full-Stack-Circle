import { config } from '../config';
import { leaveEvent, joinEvent } from './eventService';

export type UserRelationship = 'author' | 'joined' | 'none';

export interface EventData {
  id: string;
  title: string;
  date: string;
  description: string;
  relationship: UserRelationship;
  author?: string;
  attendeeCount?: number;
  maxAttendees?: number;
}

export const eventsService = {
  getDashboardEvents: async (
    tab: 'all' | 'future' | 'archived'
  ): Promise<{ events: EventData[] }> => {
    // 2: REAL API
    const { apiUrl } = await config();

    const base = apiUrl || 'http://localhost:4000';
    const filterParam = tab === 'future' ? 'upcoming' : tab === 'archived' ? 'past' : '';
    const url = filterParam ? `${base}/events?filter=${filterParam}` : `${base}/events`;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'UNAUTHORIZED');
    }

    if (!response.ok) throw new Error('Failed to fetch events from the server.');
    return response.json();
  },
  joinEvent: (eventId: string) => joinEvent(eventId),
  leaveEvent: (eventId: string) => leaveEvent(eventId),
};
