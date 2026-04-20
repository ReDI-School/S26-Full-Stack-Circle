import type { EventCardProps } from './EventCard.types';
import { EventCardStyles } from './EventCard.styles';
import { Card } from '../Card';
import { CalendarDotsIcon, UsersIcon } from '@phosphor-icons/react';
import { Button } from '../Button';
import EventCardSkeleton from './EventCardSkeleton';

export default function EventCard({}: EventCardProps) {
  if (true) {
    return <EventCardSkeleton />;
  }
  return (
    <Card>
      <div className="flex flex-col gap-7.5 font-sans">
        <div className="flex gap-2.5 items-center text-[14px] h-6 text-input-primary">
          <CalendarDotsIcon size={16.25} />
          <p>April 4, 2017 – 2:17 PM</p>
        </div>
        <div className="flex flex-col gap-7.5">
          <div>
            <p className="text-xl">How to Network</p>
            <p className="text-sm text-ec-tertiary">Owner</p>
          </div>
          <p className="text-base text-ec-secondary">
            Let’s get together and share techniques on how to network and communicate well our
            interests.
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2.5 items-center text-input-secondary">
            <UsersIcon size={20} />
            <p className="text-sm">10 of 40</p>
          </div>

          <Button variant="positive" size="small">
            JOIN
          </Button>
        </div>
      </div>
    </Card>
  );
}
