'use client';

import { Button, EventCard, ProfileCard, StickyButton, TabNav } from '@components';
import { ProhibitIcon } from '@phosphor-icons/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  getAttendeesForEvent,
  getMockProfileEvents,
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

const getActionForEvent = (event: ProfileEvent): 'join' | 'leave' | 'edit' => {
  if (event.status === 'created') return 'edit';
  if (event.status === 'going') return 'leave';

  return 'join';
};

const getEmptyStateMessage = (tab: ProfileTab) => {
  if (tab === 'created') return 'You have not created any upcoming events yet.';
  if (tab === 'going') return 'You are not going to any upcoming events yet.';

  return 'You do not have any archived events yet.';
};

const fetchMockProfileEvents = async (tab: ProfileTab) => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const profileEvents = getMockProfileEvents();

  return profileEvents[tab];
};

const ProfilePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = normalizeTab(searchParams.get('tab'));

  const [events, setEvents] = useState<ProfileEvent[]>([]);
  const [loadedTab, setLoadedTab] = useState<ProfileTab | null>(null);

  const isLoading = loadedTab !== activeTab;

  const profileEvents = useMemo(() => getMockProfileEvents(), []);

  const authoredEvents = profileEvents.created.length;
  const goingToEvents = profileEvents.going.length;
  const participatedEvents = profileEvents.archived.length;

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

  const handleCreateEvent = () => {
    console.log('Create new event clicked');
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
    let isMounted = true;

    fetchMockProfileEvents(activeTab).then((fetchedEvents) => {
      if (!isMounted) return;

      setEvents(fetchedEvents);
      setLoadedTab(activeTab);
    });

    return () => {
      isMounted = false;
    };
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
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
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
};

export default ProfilePage;
