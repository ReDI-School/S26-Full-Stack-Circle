'use client';

import { EventCard } from '@components/EventCard';
import Attendees from '@components/Attendees/Attendees';
import AttendeesSkeleton from '@components/Attendees/AttendeesSkeleton';
import useEvent from '@hooks/useEvent';
import { useParams, useRouter } from 'next/navigation';
import { LinkButton } from '@components/LinkButton';
import { Button } from '@components/Button';
import { ArrowLeftIcon } from '@phosphor-icons/react/ssr';
import { StickyButton } from '@components/StickyButton';
import { InfoBox } from '@components/InfoBox';
import { useEffect } from 'react';

export default function EventPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const { event, loading, error, action, handleAction } = useEvent({ id: id?.toString() ?? '' });

  useEffect(() => {
    if (!loading && error && !error.includes('404')) {
      router.replace('/network-error');
    }
  }, [error, loading, router]);

  if (loading)
    return (
      <div className="w-full">
        <div className="w-full flex flex-col gap-5 md:flex-row">
          <div className="flex-2 w-full">
            <EventCard isLoading={loading} action={'join'} onActionClick={() => {}} />
          </div>
          <div className="flex-1 w-full">
            <AttendeesSkeleton />
          </div>
        </div>
      </div>
    );

  return (
    <main className="flex flex-col gap-8">
      <div className="flex justify-between">
        <LinkButton icon={<ArrowLeftIcon />} color="secondary" href="/events">
          GO BACK
        </LinkButton>
        <Button
          onClick={() => router.push('/event-creation-page')}
          size="default"
          variant="idle"
          className="hidden sm:block"
        >
          CREATE NEW EVENT
        </Button>
        <StickyButton
          onClick={() => router.push('/event-creation-page')}
          label="CREATE NEW EVENT"
        ></StickyButton>
      </div>
      <div className="w-full flex flex-col gap-5 lg:flex-row">
        {error?.includes('404') || !event ? (
          <div className="w-full">
            <InfoBox variant="error" message="Event not found" />
          </div>
        ) : (
          <>
            <div className="flex-2">
              <EventCard
                id={event.id}
                isLoading={loading}
                action={action}
                date={event.date}
                title={event.title}
                author={event.organizer}
                description={event.description}
                attendeeCount={event.attendeeCount}
                maxAttendees={event.capacity}
                onActionClick={handleAction}
                interactive={false}
                variant={'fullview'}
              />
            </div>
            <div className="flex-1">
              <Attendees attendees={event.attendees} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
