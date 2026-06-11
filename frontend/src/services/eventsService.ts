import { config } from '../config';
import Cookies from 'js-cookie';

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

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true'; // Change to false to use real API

export const eventsService = {
  getDashboardEvents: async (
    tab: 'all' | 'future' | 'archived'
  ): Promise<{ events: EventData[] }> => {
    // 1: MOCKS
    if (USE_MOCKS) {
      return new Promise((resolve) => {
        const MOCK_EVENTS: EventData[] = [
          {
            id: '1',
            title: 'ReDi Tech Talk 2026',
            date: '2026-06-15',
            description: 'Annual tech conference.',
            attendeeCount: 5,
            maxAttendees: 50,
            relationship: 'author',
          },
          {
            id: '2',
            title: 'Next.js Workshop',
            date: '2026-07-20',
            description: 'Deep dive into App Router.',
            attendeeCount: 3,
            maxAttendees: 30,
            relationship: 'joined',
          },
          {
            id: '3',
            title: 'Tailwind CSS Meetup',
            date: '2026-08-05',
            description: 'Styling at scale.',
            attendeeCount: 1,
            maxAttendees: 40,
            relationship: 'none',
          },
          {
            id: '4',
            title: 'Past Node.js Summit',
            date: '2025-12-10',
            description: 'Backend architectures.',
            attendeeCount: 5,
            maxAttendees: 50,
            relationship: 'none',
          },
        ];

        const today = new Date('2026-05-29');
        let filtered = MOCK_EVENTS;

        if (tab === 'future') {
          filtered = MOCK_EVENTS.filter((e) => new Date(e.date) >= today);
        } else if (tab === 'archived') {
          filtered = MOCK_EVENTS.filter((e) => new Date(e.date) < today);
        }
        setTimeout(() => resolve({ events: filtered }), 800);
      });
    }

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
      // if unauthorized, clear token and redirect to login
      Cookies.remove('token');
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'UNAUTHORIZED');
    }

    if (!response.ok) throw new Error('Failed to fetch events from the server.');
    return response.json();
  },
  // Join an event
  joinEvent: async (eventId: string): Promise<void> => {
    if (USE_MOCKS) {
      return new Promise((resolve) => setTimeout(resolve, 400));
    }

    const { apiUrl } = await config();
    const token = Cookies.get('token');

    const base = apiUrl || 'http://localhost:4000';

    const response = await fetch(`${base}/events/${eventId}/attend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to join the event');
  },

  // Leave an event
  leaveEvent: async (eventId: string): Promise<void> => {
    if (USE_MOCKS) {
      return new Promise((resolve) => setTimeout(resolve, 400));
    }
    const { apiUrl } = await config();
    const token = Cookies.get('token');

    const base = apiUrl || 'http://localhost:4000';

    const response = await fetch(`${base}/events/${eventId}/attend`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to leave the event');
  },
};
