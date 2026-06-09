import type { EventCardProps } from './EventCard.types';
import EventCardSkeleton from './EventCardSkeleton';
import { EventCardStyles } from './EventCard.styles';
import { Card } from '../Card';
import { Button } from '../Button';
import { CalendarDotsIcon, UsersIcon } from '@phosphor-icons/react';
import { formatTimestamp } from '../../utils/utils';

const variantMap = {
  join: 'positive',
  leave: 'negative',
  edit: 'idle',
  archived: 'idle',
} as const;

export default function EventCard(props: EventCardProps) {
  if (props.isLoading) {
    return <EventCardSkeleton />;
  }

  const {
    wrapper,
    container,
    bottomContainer,
    date,
    author,
    description,
    attendees,
    buttonText,
    title,
  } = EventCardStyles();

  const buttonVariant = variantMap[props.action];
  const buttonState =
    props.action === 'archived' ? 'disabled' : props.isActionPending ? 'loading' : 'default';

  const timeStamp = formatTimestamp(props.date);

  return (
    <Card interactive={props.interactive}>
      <div className={wrapper()}>
        <div className={container()}>
          <CalendarDotsIcon size={16.25} />
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
          <Button
            variant={buttonVariant}
            state={buttonState}
            size="small"
            onClick={props.onActionClick}
          >
            <span className={buttonText()}>{props.action}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
