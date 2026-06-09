type EventCardAction = 'join' | 'leave' | 'edit' | 'archived';

type EventCardBaseProps = {
  /**
   * The action button text and behavior.
   * - `join` — Shows "JOIN" button with positive variant
   * - `leave` — Shows "LEAVE" button with negative variant
   * - `edit` — Shows "EDIT" button with idle variant
   * - `archived` — Shows "ARCHIVED" button with idle variant and disabled state
   */
  action: EventCardAction;

  /**
   * Callback function triggered when the action button is clicked.
   */
  onActionClick: () => void;
};

type EventCardLoadingProps = EventCardBaseProps & {
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
   */
  title: string;

  /**
   * Author or organizer name.
   */
  author: string;

  /**
   * Description of what the event is about.
   */
  description: string;

  /**
   * Current number of attendees.
   */
  attendeeCount: number;

  /**
   * Maximum number of attendees allowed.
   */
  maxAttendees: number;

  /**
   * Maximum number of attendees allowed.
   */
  interactive: boolean;

  /**
   * Title xl or 2xl depending on the use.
   * @default small
   */
  titleSize: 'big' | 'small';
   * Controls the action button UI state.
   *
   * - `false` — standard button behavior
   * - `true` — shows the button loading indicator and disables click
   *
   * This can be managed by the parent when an API call is in progress.
   */
  isActionPending?: boolean;
};

export type EventCardProps = EventCardLoadingProps | EventCardLoadedProps;
