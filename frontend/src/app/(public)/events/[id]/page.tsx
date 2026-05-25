'use client';

import { EventCard } from '@components/EventCard';
import Atendees from '@components/Atendees/Atendees';
import AtendeesSkeleton from '@components/Atendees/AtendeesSkeleton';
import useEvent from '@hooks/useEvent';
import { useParams } from 'next/navigation';
import { LinkButton } from '@components/LinkButton';
import { Button } from '@components/Button';
import { ArrowLeftIcon } from '@phosphor-icons/react/ssr';

export default function EventPage() {
  const params = useParams();
  const id = params.id;

  const { event, loading, error, action } = useEvent({ id: id?.toString() ?? '' });

  if (loading)
    return (
      <div className="w-full">
        <div className="w-full flex flex-col gap-5 md:flex-row">
          <div className="flex-2 w-full">
            <EventCard isLoading={loading} action={'join'} onActionClick={() => {}} />
          </div>
          <div className="flex-1 w-full">
            <AtendeesSkeleton />
          </div>
        </div>
      </div>
    );
  if (error) {
    if (error.includes('404')) {
      return <div>Network Error</div>;
    }
    return <div>Error: {error}</div>;
  }
  if (!event) return <div>Couldn't find the event</div>;

  console.log(action);

  return (
    <main className="flex flex-col gap-8">
      <div className="flex justify-between">
        <LinkButton icon={<ArrowLeftIcon />} href="" onClick={() => window.history.back()}>
          GO BACK
        </LinkButton>
        <Button size="default" variant="idle">
          CREATE NEW EVENT
        </Button>
      </div>
      <div className="w-full flex flex-col gap-5 md:flex-row">
        <div className="flex-2">
          <EventCard
            isLoading={loading}
            action={action}
            date={event.date}
            title={event.title}
            author={event.organizer}
            description={event.description}
            attendeeCount={event.attendeeCount}
            maxAttendees={event.capacity}
            onActionClick={() => {}}
            titleSize="big"
            interactive={false}
          />
        </div>
        <div className="flex-1">
          <Atendees atendees={event.attendees} />
        </div>
      </div>
    </main>
  );
}
