import type { EventCardProps } from './EventCard.types';
import { EventCardStyles } from './EventCard.styles';
import EventCardSkeleton from './EventCardSkeleton';
import { Card, Button } from '@components';
import Link from 'next/link';
import { CalendarDotsIcon, UsersIcon, ArrowSquareUpRightIcon } from '@phosphor-icons/react';
import { formatTimestamp } from '../../utils/utils';

const variantMap = {
  join: 'positive',
  leave: 'negative',
  edit: 'idle',
  archived: 'idle',
} as const;

export default function EventCard(props: EventCardProps) {
  const { variant = 'preview', isLoading } = props;

  if (isLoading) {
    return <EventCardSkeleton variant={variant} />;
  }

  const {
    wrapper,
    dateContainer,
    container,
    bottomContainer,
    date,
    title,
    author,
    description,
    attendees,
    buttonText,
    detailsContainer,
    interactive,
  } = EventCardStyles({ variant });

  const timeStamp = formatTimestamp(props.date);
  const isInteractive = interactive() === 'true' ? true : false;

  /* Determine button variant and state based on action prop */
  const buttonVariant = variantMap[props.action];
  const buttonState =
    props.action === 'archived' ? 'disabled' : props.isActionPending ? 'loading' : 'default';

  const actionButton = (
    <Button variant={buttonVariant} state={buttonState} size="small" onClick={props.onActionClick}>
      <span className={buttonText()}>{props.action}</span>
    </Button>
  );

  return (
    <Card interactive={isInteractive}>
      <div className={wrapper()}>
        {/* Date Block */}
        <div className={dateContainer()}>
          <CalendarDotsIcon size={22} aria-hidden="true" />
          <p className={date()} aria-label={`Event date: ${timeStamp}`}>
            {timeStamp}
          </p>
        </div>

        {/* Event Details Block - title, author, description */}
        <div className={wrapper()}>
          <div>
            <p className={title()}>{props.title}</p>
            <p className={author()}>{props.author}</p>
          </div>
          <p className={description()}>{props.description}</p>
        </div>

        {/* Attendees Block with action button in fullview mode */}
        <div className={bottomContainer()}>
          <div className={container()}>
            <UsersIcon size={20} aria-hidden="true" />
            <p
              className={attendees()}
              aria-label={`${props.attendeeCount} of ${props.maxAttendees} attendees`}
            >
              {props.attendeeCount} of {props.maxAttendees}
            </p>
          </div>
          {variant === 'fullview' && actionButton}
        </div>

        {/* View Details block - only shown in preview mode */}
        {variant === 'preview' && (
          <div className={bottomContainer()}>
            <div className={container()}>
              <Link href={`/events/${props.id}`} className={detailsContainer()}>
                <ArrowSquareUpRightIcon size={22} aria-hidden="true" />
                <span>View details</span>
              </Link>
            </div>

            {actionButton}
          </div>
        )}
      </div>
    </Card>
  );
}
