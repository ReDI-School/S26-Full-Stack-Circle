export type ProfileTab = 'created' | 'going' | 'archived';

export type Attendee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Attendance = {
  id: string;
  userId: string;
  eventId: string;
  createdAt: string;
  user: Attendee;
};

export type EventData = {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  organizer: string;
  attendeeCount: number;
  attendees: string[];
  attendances: Attendance[];
};

export type RawProfileEvent = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string;
  capacity: number;
  organizerId: string;
  organizer: { firstName: string; lastName: string };
  _count: { attendances: number };
};

export type ProfileEvent = {
  id: string;
  status: ProfileTab;
  date: Date;
  title: string;
  author: string;
  description: string;
  attendeeCount: number;
  maxAttendees: number;
};

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
  isAttending: boolean;
};