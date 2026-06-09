'use client';

import { Button, EventCard, ProfileCard, StickyButton, TabNav } from '@components';
import { ProhibitIcon } from '@phosphor-icons/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  fetchProfileEventsByTab,
  getAttendeesForEvent,
  getCreatedProfileEvents,
  getGoingProfileEvents,
  getArchivedProfileEvents,
  getUserFullName,
  mockProfileUser,
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

const ProfilePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = useMemo(() => normalizeTab(searchParams.get('tab')), [searchParams]);

  const [events, setEvents] = useState<ProfileEvent[]>([]);
  const [loadedTab, setLoadedTab] = useState<ProfileTab | null>(null);
  const currentFetchId = useRef<symbol | null>(null);

  const isLoading = loadedTab !== activeTab;

  const { authoredEvents, goingToEvents, participatedEvents } = useMemo(
    () => ({
      authoredEvents: getCreatedProfileEvents().length,
      goingToEvents: getGoingProfileEvents().length,
      participatedEvents: getArchivedProfileEvents().length,
    }),
    []
  );

  const eventsWithActions = useMemo(
    () => events.map((event) => ({ ...event, action: getActionForEvent(event) })),
    [events]
  );

  const handleTabChange = useCallback(
    (tab: string) => {
      const nextTab = normalizeTab(tab.toLowerCase());

      if (nextTab === activeTab) return;

      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.set('tab', nextTab);

      router.push(`${pathname}?${nextParams.toString()}`);
    },
    [activeTab, pathname, router, searchParams]
  );

  const handleCreateEvent = useCallback(() => {
    // For now, action is logged. In the future, this would navigate to a create event page or open a modal.
    console.log('Create new event clicked');
  }, []);

  const handleEventAction = useCallback(
    (eventId: string) => {
      const event = events.find((item) => item.id === eventId);
      if (!event) return;

      const action = getActionForEvent(event);

      console.log(`${action} clicked`, {
        eventId: event.id,
        title: event.title,
        attendees: getAttendeesForEvent(event.id),
      });
    },
    [events]
  );

  useEffect(() => {
    const fetchId = Symbol();
    currentFetchId.current = fetchId;

    fetchProfileEventsByTab(activeTab).then((fetchedEvents) => {
      if (currentFetchId.current !== fetchId) return;

      setEvents(fetchedEvents);
      setLoadedTab(activeTab);
    });
  }, [activeTab]);

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:py-10">
      <ProfileCard
        name={getUserFullName(mockProfileUser)}
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
        ) : eventsWithActions.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {eventsWithActions.map((event) => (
              <EventCard
                key={event.id}
                date={event.date}
                title={event.title}
                author={event.author}
                description={event.description}
                attendeeCount={event.attendeeCount}
                maxAttendees={event.maxAttendees}
                action={event.action}
                onActionClick={() => handleEventAction(event.id)}
                id={event.id}
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
};

export default ProfilePage;
