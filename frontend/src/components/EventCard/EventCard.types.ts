type EventCardAction = 'join' | 'leave' | 'edit';

type EventCardBaseProps = {
  /**
   * The action button text and behavior.
   * - `join` — Shows "JOIN" button with positive variant
   * - `leave` — Shows "LEAVE" button with negative variant
   * - `edit` — Shows "EDIT" button with idle variant
   */
  action: EventCardAction;

  /**
   * Callback function triggered when the action button is clicked.
   */
  onActionClick: () => void;
};

type EventCardLoadingProps = EventCardBaseProps & {
  /** @default true */
  isLoading: true;
};

type EventCardLoadedProps = EventCardBaseProps & {
  /**
   * Whether the card is in loading state.
   * @default false
   */
  isLoading?: false;

  /**
   * Date of the event in stardart ISO: 2017-04-04T14:17:00Z
   */
  date: Date;

  /**
   * Title of the event.
   * @default 'How to Network'
   */
  title: string;

  /**
   * Author or organizer name.
   * @default 'Owner'
   */
  author: string;

  /**
   * Description of what the event is about.
   * @default 'Let's get together and share techniques on how to network and communicate well our interests.'
   */
  description: string;

  /**
   * Current number of attendees.
   * @default 10
   */
  attendeeCount: number;

  /**
   * Maximum number of attendees allowed.
   * @default 40
   */
  maxAttendees: number;
};

export type EventCardProps = EventCardLoadingProps | EventCardLoadedProps;
