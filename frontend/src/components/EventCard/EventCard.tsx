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
} as const;

export default function EventCard(props: EventCardProps) {
  if (props.isLoading) {
    return <EventCardSkeleton />;
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
  } = EventCardStyles();

  const buttonVariant = variantMap[props.action];

  const timeStamp = formatTimestamp(props.date);

  return (
    <Card interactive>
      <div className={wrapper()}>
        <div className={dateContainer()}>
          <CalendarDotsIcon size={22} />
          <p className={date()}>{timeStamp}</p>
        </div>
        <div className={wrapper()}>
          <div>
            <p className={title()}>{props.title}</p>
            <p className={author()}>{props.author}</p>
          </div>
          <p className={description()}>{props.description}</p>
        </div>
        <div className={bottomContainer()}>
          <div className={container()}>
            <UsersIcon size={20} />
            <p className={attendees()}>
              {props.attendeeCount} of {props.maxAttendees}
            </p>
          </div>
        </div>

        <div className={bottomContainer()}>
          <div className={container()}>
            <Link href={`/events/${props.id}`} className={detailsContainer()}>
              <ArrowSquareUpRightIcon size={22} />
              <span>View details</span>
            </Link>
          </div>

          <Button variant={buttonVariant} size="small" onClick={props.onActionClick}>
            <span className={buttonText()}>{props.action}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
