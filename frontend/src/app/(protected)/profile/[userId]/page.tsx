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

type MockUser = {
  id: string;
  name: string;
  events: MockEvent[];
};

const PROFILE_TABS = ['CREATED', 'GOING', 'ARCHIVED'];
const SKELETON_CARD_COUNT = 6;

const normalizeTab = (tab: string | null): ProfileTab => {
  if (tab === 'going' || tab === 'archived') return tab;
  return 'created';
};

const mockUser: MockUser = {
  id: '1',
  name: 'John Doe',
  events: [
    {
      status: 'created',
      date: new Date('2026-06-10T18:00:00Z'),
      title: 'React Summit 2026',
      author: 'John Doe',
      description:
        'Join frontend developers from around the world to discuss the latest React features and ecosystem tools.',
      attendeeCount: 120,
      maxAttendees: 300,
    },
    {
      status: 'created',
      date: new Date('2026-06-12T14:00:00Z'),
      title: 'UI/UX Design Workshop',
      author: 'John Doe',
      description: 'Hands-on workshop focused on creating accessible and modern user interfaces.',
      attendeeCount: 45,
      maxAttendees: 50,
    },
    {
      status: 'created',
      date: new Date('2026-06-15T17:30:00Z'),
      title: 'Startup Networking Meetup',
      author: 'John Doe',
      description:
        'Meet founders, investors, and engineers building the next generation of startups.',
      attendeeCount: 88,
      maxAttendees: 120,
    },
    {
      status: 'going',
      date: new Date('2026-06-20T20:00:00Z'),
      title: '24hr Community Hackathon',
      author: 'John Doe',
      description:
        'Collaborate with developers and designers to build innovative projects in 24 hours.',
      attendeeCount: 67,
      maxAttendees: 100,
    },
    {
      status: 'going',
      date: new Date('2026-06-22T16:00:00Z'),
      title: 'Product Management Meetup',
      author: 'John Doe',
      description:
        'Discuss product strategy, prioritization, and scaling successful SaaS products.',
      attendeeCount: 34,
      maxAttendees: 80,
    },
    {
      status: 'archived',
      date: new Date('2026-07-01T18:30:00Z'),
      title: 'Open Source Contributors Night',
      author: 'John Doe',
      description:
        'Celebrate open source contributions and connect with maintainers and contributors.',
      attendeeCount: 190,
      maxAttendees: 250,
    },
  ],
};

const fetchMockProfileEvents = async ({ user, tab }: { user: MockUser; tab: ProfileTab }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return user.events.filter((event) => event.status === tab);
};

const ProfilePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = normalizeTab(searchParams.get('tab'));

  // Track the events, and specifically which tab those events belong to
  const [events, setEvents] = useState<MockEvent[]>([]);
  const [loadedTab, setLoadedTab] = useState<ProfileTab | null>(null);

  // Derived state: If the URL wants a tab we haven't loaded yet, we are loading.
  // This completely eliminates the need for synchronous setStates in the effect.
  const isLoading = loadedTab !== activeTab;

  const authoredEvents = useMemo(
    () => mockUser.events.filter((event) => event.status === 'created').length,
    []
  );

  const goingToEvents = useMemo(
    () => mockUser.events.filter((event) => event.status === 'going').length,
    []
  );

  const participatedEvents = useMemo(
    () => mockUser.events.filter((event) => event.status === 'archived').length,
    []
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

  useEffect(() => {
    let isMounted = true;

    fetchMockProfileEvents({ user: mockUser, tab: activeTab }).then((fetchedEvents) => {
      if (!isMounted) return;

      // Update the data and the reference tab simultaneously
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
        name={mockUser.name}
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

// export type Role = 'USER' | 'ADMIN';

// export interface BackendUser {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   role: Role;
// }

// export interface BackendEvent {
//   id: string;
//   title: string;
//   description: string | null;
//   date: string;
//   location: string;
//   capacity: number;
//   organizerId: string;
//   organizer: {
//     firstName: string;
//     lastName: string;
//   };
//   _count: {
//     attendances: number;
//   };
// }

// export interface UserProfileResponse {
//   user: BackendUser;
//   organizedEvents: BackendEvent[];
//   attendedEvents: BackendEvent[];
// }

// export const mockBackendResponse: UserProfileResponse = {
//   user: {
//     id: '1',
//     email: 'john.doe@example.com',
//     firstName: 'John',
//     lastName: 'Doe',
//     role: 'USER',
//   },
//   organizedEvents: [
//     {
//       id: 'evt_1',
//       title: 'React Summit 2026',
//       description:
//         'Join frontend developers from around the world to discuss the latest React features and ecosystem tools.',
//       date: '2026-06-10T18:00:00Z',
//       location: 'Virtual',
//       capacity: 300,
//       organizerId: '1',
//       organizer: { firstName: 'John', lastName: 'Doe' },
//       _count: { attendances: 120 },
//     },
//     {
//       id: 'evt_2',
//       title: 'UI/UX Design Workshop',
//       description: 'Hands-on workshop focused on creating accessible and modern user interfaces.',
//       date: '2026-06-12T14:00:00Z',
//       location: 'Studio A',
//       capacity: 50,
//       organizerId: '1',
//       organizer: { firstName: 'John', lastName: 'Doe' },
//       _count: { attendances: 45 },
//     },
//     {
//       id: 'evt_3',
//       title: 'Startup Networking Meetup',
//       description:
//         'Meet founders, investors, and engineers building the next generation of startups.',
//       date: '2026-06-15T17:30:00Z',
//       location: 'Innovation Center',
//       capacity: 120,
//       organizerId: '1',
//       organizer: { firstName: 'John', lastName: 'Doe' },
//       _count: { attendances: 88 },
//     },
//   ],
//   attendedEvents: [
//     {
//       id: 'evt_4',
//       title: '24hr Community Hackathon',
//       description:
//         'Collaborate with developers and designers to build innovative projects in 24 hours.',
//       date: '2026-06-20T20:00:00Z', // Future date
//       location: 'Main Hall',
//       capacity: 100,
//       organizerId: '2',
//       organizer: { firstName: 'Jane', lastName: 'Smith' },
//       _count: { attendances: 67 },
//     },
//     {
//       id: 'evt_5',
//       title: 'Product Management Meetup',
//       description:
//         'Discuss product strategy, prioritization, and scaling successful SaaS products.',
//       date: '2026-06-22T16:00:00Z', // Future date
//       location: 'Conference Room B',
//       capacity: 80,
//       organizerId: '3',
//       organizer: { firstName: 'Alice', lastName: 'Jones' },
//       _count: { attendances: 34 },
//     },
//     {
//       id: 'evt_6',
//       title: 'Open Source Contributors Night',
//       description:
//         'Celebrate open source contributions and connect with maintainers and contributors.',
//       // FIXED DATE: Must be in the past relative to today to be considered "archived"
//       date: '2026-05-15T18:30:00Z',
//       location: 'Pub',
//       capacity: 250,
//       organizerId: '4',
//       organizer: { firstName: 'Bob', lastName: 'Martin' },
//       _count: { attendances: 190 },
//     },
//   ],
// };

// const transformToUiEvents = (response: UserProfileResponse): MockEvent[] => {
//   const now = new Date().getTime();

//   const createdEvents = response.organizedEvents.map((event) => ({
//     status: 'created' as const,
//     date: new Date(event.date),
//     title: event.title,
//     author: `${event.organizer.firstName} ${event.organizer.lastName}`,
//     description: event.description || '',
//     attendeeCount: event._count.attendances,
//     maxAttendees: event.capacity,
//   }));

//   const attendedEvents = response.attendedEvents.map((event) => {
//     const eventDate = new Date(event.date).getTime();
//     // Dynamically calculate if it is going or archived based on current time
//     const status = eventDate < now ? ('archived' as const) : ('going' as const);

//     return {
//       status,
//       date: new Date(event.date),
//       title: event.title,
//       author: `${event.organizer.firstName} ${event.organizer.lastName}`,
//       description: event.description || '',
//       attendeeCount: event._count.attendances,
//       maxAttendees: event.capacity,
//     };
//   });

//   return [...createdEvents, ...attendedEvents];
// };
