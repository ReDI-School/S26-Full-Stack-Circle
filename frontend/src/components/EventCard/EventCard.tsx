import type { EventCardProps } from './EventCard.types';
import { Card } from '../Card';
import { CalendarDotsIcon, UsersIcon } from '@phosphor-icons/react';
import { Button } from '../Button';
import EventCardSkeleton from './EventCardSkeleton';

const variantMap = {
  join: 'positive',
  leave: 'negative',
  edit: 'idle',
} as const;

export default function EventCard(props: EventCardProps) {
  if (props.isLoading) {
    return <EventCardSkeleton />;
  }

  const buttonVariant = variantMap[props.action];

  return (
    <Card interactive>
      <div className="flex flex-col gap-7.5 font-sans">
        <div className="flex gap-2.5 items-center text-[14px] h-6 text-input-primary">
          <CalendarDotsIcon size={16.25} />
          <p>{props.date}</p>
        </div>
        <div className="flex flex-col gap-7.5">
          <div>
            <p className="text-xl">{props.title}</p>
            <p className="text-sm text-ec-tertiary">{props.author}</p>
          </div>
          <p className="text-base text-ec-secondary">{props.description}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2.5 items-center text-input-secondary">
            <UsersIcon size={20} />
            <p className="text-sm">
              {props.attendeeCount} of {props.maxAttendees}
            </p>
          </div>
          <Button variant={buttonVariant} size="small" onClick={props.onActionClick}>
            <p className="uppercase">{props.action}</p>
          </Button>
        </div>
      </div>
    </Card>
  );
}
