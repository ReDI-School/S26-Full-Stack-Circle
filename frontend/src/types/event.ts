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
