import { Attendance } from '@types/event';

export type RawEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  organizer: {
    id: string;
    firstName: string;
    lastName: string;
  };
  attendances: Attendance[];
  isOwner: boolean;
  isAtending: boolean;
};

export async function fetchEventById(id: string): Promise<RawEvent> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const url = `${apiUrl}/events/${id}`;

  console.log(url);

  const token = localStorage.getItem('token');
  const headers: HeadersInit = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new Error(`Failed to fetch event: ${res.status}`);
  }

  const { event } = await res.json();
  return event;
}
