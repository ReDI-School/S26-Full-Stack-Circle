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

const USE_MOCKS = false; // Change to false to use real API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const eventsFrontendService = {
  getDashboardEvents: async (tab: 'all' | 'future' | 'archived'): Promise<{events:EventData[]}> => {
    
    // 1: MOCKS
    if (USE_MOCKS) {
      return new Promise((resolve) => {
        const MOCK_EVENTS: EventData[] = [
          { id: '1', title: 'ReDi Tech Talk 2026', date: '2026-06-15', description: 'Annual tech conference.', relationship: 'author' },
          { id: '2', title: 'Next.js Workshop', date: '2026-07-20', description: 'Deep dive into App Router.', relationship: 'joined' },
          { id: '3', title: 'Tailwind CSS Meetup', date: '2026-08-05', description: 'Styling at scale.', relationship: 'none' },
          { id: '4', title: 'Past Node.js Summit', date: '2025-12-10', description: 'Backend architectures.', relationship: 'none' },
        ];

        const today = new Date('2026-05-29'); 
        let filtered = MOCK_EVENTS;

        if (tab === 'future') {
          filtered = MOCK_EVENTS.filter(e => new Date(e.date) >= today);
        } else if (tab === 'archived') {
          filtered = MOCK_EVENTS.filter(e => new Date(e.date) < today);
        }
        setTimeout(() => resolve(filtered), 800);
      });
    }

    // 2: REAL API
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('No authentication token found. Please log in again.');
    }

    const filterParam = tab === 'future' ? 'upcoming' : tab === 'archived' ? 'past' : undefined;
    const url = new URL(`${API_BASE_URL}/events`);
    if (filterParam) url.searchParams.append('filter', filterParam);

    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      // if unauthorized, clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Unauthorized. Redirecting to login.');
    }

    if (!response.ok) throw new Error('Failed to fetch events from the server.');
    return response.json();
  }
};