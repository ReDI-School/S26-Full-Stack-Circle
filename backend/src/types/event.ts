export type UpdateEventData = {
  title?: string;
  description?: string | null;
  date?: Date;
  location?: string;
  capacity?: number;
};

export type UserEventFilter = 'created' | 'attending' | 'archived';
