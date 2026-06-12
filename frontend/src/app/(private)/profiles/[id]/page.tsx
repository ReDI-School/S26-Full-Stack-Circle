'use client';

import { Button, EventCard, ProfileCard, StickyButton, TabNav } from '@components';
import { ProhibitIcon } from '@phosphor-icons/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState, Suspense } from 'react';
import useAuth from '@hooks/useAuth';

import {
  fetchProfileEventsByTab,
  getAttendeesForEvent,
  getCreatedProfileEvents,
  getGoingProfileEvents,
  getArchivedProfileEvents,
  ProfileEvent,
  ProfileTab,
} from './mockProfileData';

const PROFILE_TABS = ['CREATED', 'GOING', 'ARCHIVED'];
const SKELETON_CARD_COUNT = 6;

const normalizeTab = (tab: string | null): ProfileTab => {
  if (tab === 'created' || tab === 'going' || tab === 'archived') {
    return tab;
  }
  return 'created';
};

const getActionForEvent = (event: ProfileEvent): 'leave' | 'edit' | 'archived' => {
  if (event.status === 'created') return 'edit';
  if (event.status === 'going') return 'leave';
  return 'archived';
};

const getEmptyStateMessage = (tab: ProfileTab) => {
  if (tab === 'created') return 'You have not created any upcoming events yet.';
  if (tab === 'going') return 'You are not going to any upcoming events yet.';
  return 'You do not have any archived events yet.';
};

function ProfileContent() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = normalizeTab(searchParams.get('tab'));

  const [eventsState, setEventsState] = useState<{ tab: ProfileTab | null; data: ProfileEvent[] }>({
    tab: null,
    data: [],
  });

  const isLoading = eventsState.tab !== activeTab;
  const events = isLoading ? [] : eventsState.data;

  const userFullName = user ? `${user.firstName} ${user.lastName}` : '';

  const { authoredEvents, goingToEvents, participatedEvents } = useMemo(
    () => ({
      authoredEvents: getCreatedProfileEvents().length,
      goingToEvents: getGoingProfileEvents().length,
      participatedEvents: getArchivedProfileEvents().length,
    }),
    []
  );

  const handleTabChange = (tab: string) => {
    const nextTab = normalizeTab(tab.toLowerCase());
    if (nextTab === activeTab) return;

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set('tab', nextTab);
    router.push(`${pathname}?${nextParams.toString()}`);
  };

  const handleCreateEvent = () => {
    router.push('/create-event');
  };

  const handleEventAction = (event: ProfileEvent) => {
    const action = getActionForEvent(event);
    console.log(`${action} clicked`, {
      eventId: event.id,
      title: event.title,
      attendees: getAttendeesForEvent(event.id),
    });
  };

  useEffect(() => {
    let ignore = false;

    fetchProfileEventsByTab(activeTab)
      .then((fetchedEvents) => {
        if (ignore) return;
        setEventsState({ tab: activeTab, data: fetchedEvents });
      })
      .catch((error) => {
        if (ignore) return;
        console.error('Failed to fetch events', error);
        setEventsState({ tab: activeTab, data: [] });
      });

    return () => {
      ignore = true;
    };
  }, [activeTab]);

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:py-10">
      <ProfileCard
        name={userFullName}
        authoredEvents={authoredEvents}
        goingToEvents={goingToEvents}
        participatedEvents={participatedEvents}
      />

      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <TabNav
          tabs={PROFILE_TABS}
          activeTab={activeTab.toUpperCase()}
          onTabChange={handleTabChange}
        />

        <div className="hidden md:block">
          <Button variant="idle" onClick={handleCreateEvent}>
            CREATE NEW EVENT
          </Button>
        </div>
      </section>

      <section>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
              <EventCard key={index} isLoading action="edit" onActionClick={() => undefined} />
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                date={event.date}
                title={event.title}
                author={event.author}
                description={event.description}
                attendeeCount={event.attendeeCount}
                maxAttendees={event.maxAttendees}
                action={getActionForEvent(event)}
                onActionClick={() => handleEventAction(event)}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-60 flex-col items-center justify-center gap-3 rounded-base bg-white p-8 text-center shadow-[0px_1px_2px_0px_#00000026]">
            <ProhibitIcon size={40} />
            <p className="text-lg text-text-secondary">{getEmptyStateMessage(activeTab)}</p>
          </div>
        )}
      </section>

      <StickyButton label="CREATE NEW EVENT" onClick={handleCreateEvent} />
    </main>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <ProfileContent />
    </Suspense>
  );
}
