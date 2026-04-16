type EventCardAction = 'join' | 'leave' | 'edit';

type EventCardBaseProps = {
  elevated?: boolean;
  action: EventCardAction;
  onActionClick: () => void;
};

type EventCardLoadingProps = EventCardBaseProps & {
  isLoading: true;
};

type EventCardLoadedProps = EventCardBaseProps & {
  isLoading?: false;
  date: string;
  title: string;
  author: string;
  description: string;
  attendeeCount: number;
  maxAttendees: number;
};

export type EventCardProps = EventCardLoadingProps | EventCardLoadedProps;
