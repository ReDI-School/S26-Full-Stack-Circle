'use client';

import { Button, EventCard, EventCardProps, ProfileCard, StickyButton, TabNav } from '@components';
import { ProhibitIcon } from '@phosphor-icons/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

type ProfileTab = 'created' | 'going' | 'archived';

type EventCardLoadedProps = Extract<EventCardProps, { isLoading?: false }>;

type MockEvent = Omit<EventCardLoadedProps, 'action' | 'onActionClick' | 'isLoading'> & {
  status: ProfileTab;
};

type BackendUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
  events: BackendEvent[];
  attendances: BackendAttendance[];
};

type BackendEvent = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string;
  capacity: number;
  organizerId: string;
  organizer: {
    id: string;
    firstName: string;
    lastName: string;
  };
  attendances: BackendAttendanceSummary[];
};

type BackendAttendance = {
  id: string;
  userId: string;
  eventId: string;
  createdAt: string;
  event: BackendEvent;
};

type BackendAttendanceSummary = {
  id: string;
  userId: string;
  eventId: string;
};

const PROFILE_TABS = ['CREATED', 'GOING', 'ARCHIVED'];
const SKELETON_CARD_COUNT = 6;

const normalizeTab = (tab: string | null): ProfileTab => {
  if (tab === 'going' || tab === 'archived') return tab;
  return 'created';
};

const createAttendanceSummaries = (eventId: string, count: number): BackendAttendanceSummary[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `${eventId}-attendance-${index + 1}`,
    userId: `user-${index + 1}`,
    eventId,
  }));

const mockUser: BackendUser = {
  id: '1',
  email: 'fabio.rodrigues@example.com',
  firstName: 'Fabio',
  lastName: 'Rodrigues',
  role: 'USER',
  createdAt: '2026-01-10T10:00:00Z',
  updatedAt: '2026-01-10T10:00:00Z',

  // Created tab: events created/organized by this user
  events: [
    {
      id: 'event-1',
      title: 'React Summit 2026',
      description:
        'Join frontend developers from around the world to discuss the latest React features and ecosystem tools.',
      date: '2026-06-10T18:00:00Z',
      location: 'Berlin',
      capacity: 300,
      organizerId: '1',
      organizer: {
        id: '1',
        firstName: 'Fabio',
        lastName: 'Rodrigues',
      },
      attendances: createAttendanceSummaries('event-1', 120),
    },
    {
      id: 'event-2',
      title: 'UI/UX Design Workshop',
      description: 'Hands-on workshop focused on creating accessible and modern user interfaces.',
      date: '2026-06-12T14:00:00Z',
      location: 'Hamburg',
      capacity: 50,
      organizerId: '1',
      organizer: {
        id: '1',
        firstName: 'Fabio',
        lastName: 'Rodrigues',
      },
      attendances: createAttendanceSummaries('event-2', 45),
    },
    {
      id: 'event-3',
      title: 'Startup Networking Meetup',
      description:
        'Meet founders, investors, and engineers building the next generation of startups.',
      date: '2026-06-15T17:30:00Z',
      location: 'Munich',
      capacity: 120,
      organizerId: '1',
      organizer: {
        id: '1',
        firstName: 'Fabio',
        lastName: 'Rodrigues',
      },
      attendances: createAttendanceSummaries('event-3', 88),
    },
  ],

  // Going + Archived tabs: events this user is attending
  attendances: [
    {
      id: 'attendance-1',
      userId: '1',
      eventId: 'event-4',
      createdAt: '2026-05-01T10:00:00Z',
      event: {
        id: 'event-4',
        title: '24hr Community Hackathon',
        description:
          'Collaborate with developers and designers to build innovative projects in 24 hours.',
        date: '2026-06-20T20:00:00Z',
        location: 'Berlin',
        capacity: 100,
        organizerId: '2',
        organizer: {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
        },
        attendances: createAttendanceSummaries('event-4', 67),
      },
    },
    {
      id: 'attendance-2',
      userId: '1',
      eventId: 'event-5',
      createdAt: '2026-05-03T10:00:00Z',
      event: {
        id: 'event-5',
        title: 'Product Management Meetup',
        description:
          'Discuss product strategy, prioritization, and scaling successful SaaS products.',
        date: '2026-06-22T16:00:00Z',
        location: 'Cologne',
        capacity: 80,
        organizerId: '3',
        organizer: {
          id: '3',
          firstName: 'Alice',
          lastName: 'Jones',
        },
        attendances: createAttendanceSummaries('event-5', 34),
      },
    },
    {
      id: 'attendance-3',
      userId: '1',
      eventId: 'event-6',
      createdAt: '2026-04-01T10:00:00Z',
      event: {
        id: 'event-6',
        title: 'Open Source Contributors Night',
        description:
          'Celebrate open source contributions and connect with maintainers and contributors.',
        date: '2026-05-15T18:30:00Z',
        location: 'Berlin',
        capacity: 250,
        organizerId: '4',
        organizer: {
          id: '4',
          firstName: 'Bob',
          lastName: 'Martin',
        },
        attendances: createAttendanceSummaries('event-6', 190),
      },
    },
  ],
};

const getUserFullName = (user: Pick<BackendUser, 'firstName' | 'lastName'>) =>
  `${user.firstName} ${user.lastName}`;

const transformEventToCard = (event: BackendEvent, status: ProfileTab): MockEvent => ({
  status,
  date: new Date(event.date),
  title: event.title,
  author: `${event.organizer.firstName} ${event.organizer.lastName}`,
  description: event.description ?? '',
  attendeeCount: event.attendances.length,
  maxAttendees: event.capacity,
});

const getProfileEvents = (user: BackendUser) => {
  const now = new Date();

  const createdEvents = user.events.map((event) => transformEventToCard(event, 'created'));

  const goingEvents = user.attendances
    .map((attendance) => attendance.event)
    .filter((event) => new Date(event.date) >= now)
    .map((event) => transformEventToCard(event, 'going'));

  const archivedEvents = user.attendances
    .map((attendance) => attendance.event)
    .filter((event) => new Date(event.date) < now)
    .map((event) => transformEventToCard(event, 'archived'));

  return {
    createdEvents,
    goingEvents,
    archivedEvents,
  };
};

const fetchMockProfileEvents = async ({ user, tab }: { user: BackendUser; tab: ProfileTab }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { createdEvents, goingEvents, archivedEvents } = getProfileEvents(user);

  const eventsByTab: Record<ProfileTab, MockEvent[]> = {
    created: createdEvents,
    going: goingEvents,
    archived: archivedEvents,
  };

  return eventsByTab[tab];
};

const ProfilePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = normalizeTab(searchParams.get('tab'));

  const [events, setEvents] = useState<MockEvent[]>([]);
  const [loadedTab, setLoadedTab] = useState<ProfileTab | null>(null);

  const isLoading = loadedTab !== activeTab;

  const { createdEvents, goingEvents, archivedEvents } = useMemo(
    () => getProfileEvents(mockUser),
    []
  );

  const authoredEvents = createdEvents.length;
  const goingToEvents = goingEvents.length;
  const participatedEvents = archivedEvents.length;

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

  useEffect(() => {
    let isMounted = true;

    fetchMockProfileEvents({ user: mockUser, tab: activeTab }).then((fetchedEvents) => {
      if (!isMounted) return;

      setEvents(fetchedEvents);
      setLoadedTab(activeTab);
    });

    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:py-10 color-bg-secondary">
      <ProfileCard
        name={getUserFullName(mockUser)}
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
          <Button variant="idle">CREATE NEW EVENT</Button>
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
                key={`${event.title}-${event.date.toISOString()}`}
                {...event}
                action={event.status === 'going' ? 'leave' : 'edit'}
                onActionClick={() =>
                  console.log(`${event.status === 'going' ? 'Leave' : 'Edit'} ${event.title}`)
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center md:py-32">
            <ProhibitIcon size={80} className="text-teal-500" aria-hidden="true" />
            <p className="text-sm font-semibold tracking-wide text-teal-700">
              THERE ARE NO EVENTS TO DISPLAY
            </p>
          </div>
        )}
      </section>

      <StickyButton label="CREATE NEW EVENT" />
    </main>
  );
};

export default ProfilePage;
