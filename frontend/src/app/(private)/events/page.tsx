'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TabNav } from '@components/TabNav';
import { EventCard } from '@components/EventCard';
import { StickyButton } from '@components/StickyButton';
import { eventsService, EventData } from '@service/eventsService';
import Image from 'next/image';
import imageSrc from '../../../assets/images/empty-state.png';

export type TabType = 'ALL EVENTS' | 'FUTURE EVENTS' | 'ARCHIVED';

const parseParamToTab = (param: string | null): TabType => {
  if (param === 'future') return 'FUTURE EVENTS';
  if (param === 'archived') return 'ARCHIVED';
  return 'ALL EVENTS';
};

const parseTabToParam = (tab: TabType): string => {
  if (tab === 'FUTURE EVENTS') return 'future';
  if (tab === 'ARCHIVED') return 'archived';
  return 'all';
};

function EventsDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Tab synchronizing
  const currentTab = parseParamToTab(searchParams.get('tab'));
  const currentParam = parseTabToParam(currentTab);

  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pendingEventIds, setPendingEventIds] = useState<Set<string>>(new Set());

  const fetchDashboardEvents = useCallback(
    async (isMounted: boolean = true) => {
      try {
        const data = await eventsService.getDashboardEvents(
          currentParam as 'all' | 'future' | 'archived'
        );
        if (isMounted) {
          const realEvents = Array.isArray(data) ? data : data?.events || [];
          setEvents(realEvents);
        }
      } catch (err) {
        console.error('Dashboard failed to retrieve view data:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    },
    [currentParam]
  );
  // Update URL parameter
  const handleTabChange = (selectedTab: string) => {
    setIsLoading(true);
    const paramValue = parseTabToParam(selectedTab as TabType);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', paramValue);
    router.push(`?${params.toString()}`);
  };

  // Update event relationship (Join/Leave/Edit)
  const handleEventAction = async (
    eventId: string,
    currentRelationship: 'author' | 'joined' | 'none'
  ): Promise<void> => {
    if (currentRelationship === 'author') {
      router.push(`/events/${eventId}/edit`);
      return;
    }

    const isJoining = currentRelationship === 'none';

    setPendingEventIds((prev) => new Set(prev).add(eventId));

    try {
      if (isJoining) {
        await eventsService.joinEvent(eventId);
      } else {
        await eventsService.leaveEvent(eventId);
      }
      setEvents((prevEvents) =>
        prevEvents.map((event) => {
          if (event.id === eventId) {
            return {
              ...event,
              relationship: isJoining ? 'joined' : 'none',
              attendeeCount: isJoining
                ? (event.attendeeCount ?? 0) + 1
                : Math.max(0, (event.attendeeCount ?? 0) - 1),
            };
          }
          return event;
        })
      );
    } catch (error) {
      console.error('Action failed:', error);
      if (
        error instanceof Error &&
        (error.message === 'UNAUTHORIZED' || error.message.includes('token'))
      ) {
        router.push('/sign-in');
        return;
      }
    } finally {
      setPendingEventIds((prev) => {
        const next = new Set(prev);
        next.delete(eventId);
        return next;
      });
    }
  };

  // Data fetching with loading state
  useEffect(() => {
    let isMounted = true;
    const initializeDashboard = async () => {
      await fetchDashboardEvents(isMounted);
    };

    initializeDashboard();

    return () => {
      isMounted = false;
    };
  }, [fetchDashboardEvents]);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 pb-24 md:pb-8 relative">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-4 mb-8 w-full">
        <div className="w-full md:w-auto">
          <TabNav
            activeTab={currentTab}
            onTabChange={handleTabChange}
            tabs={['ALL EVENTS', 'FUTURE EVENTS', 'ARCHIVED']}
          />
        </div>

        <div className="w-full md:w-auto fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:static md:border-none md:p-0 md:bg-transparent z-50">
          <StickyButton
            label="CREATE NEW EVENT"
            onClick={() => router.push('/events/create')}
            className="w-full md:w-max block"
          />
        </div>
      </header>

      {/* 1. (LOADING STATE) */}
      {isLoading && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {Array.from({ length: 3 }).map((_, idx) => (
            <EventCard
              key={`skeleton-${idx}`}
              isLoading={true}
              action="join"
              onActionClick={() => {}}
            />
          ))}
        </section>
      )}

      {/* 2. (EMPTY STATE) */}
      {!isLoading && events.length === 0 && (
        <section className="flex flex-col items-center justify-center min-h-[300px] text-center gap-4 w-full">
          <div>
            <Image
              src={imageSrc}
              alt="No events found"
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <h3 className="text-sm font-medium text-tabs-idle tracking-wide uppercase">
            THERE ARE NO EVENTS TO DISPLAY
          </h3>
        </section>
      )}

      {/* 3. (LOADED STATE)*/}
      {!isLoading && events.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {events.map((event) => (
            <EventCard
              id={event.id}
              key={event.id}
              isLoading={false}
              title={event.title}
              author={
                event.author || (event.relationship === 'author' ? 'Me (Author)' : 'ReDi Community')
              }
              date={new Date(event.date)}
              description={event.description}
              attendeeCount={event.attendeeCount ?? 0}
              maxAttendees={event.maxAttendees ?? 50}
              action={
                currentTab === 'ARCHIVED'
                  ? 'archived'
                  : event.relationship === 'author'
                    ? 'edit'
                    : event.relationship === 'joined'
                      ? 'leave'
                      : 'join'
              }
              isActionPending={pendingEventIds.has(event.id)}
              onActionClick={() => {
                if (currentTab !== 'ARCHIVED') {
                  handleEventAction(event.id, event.relationship);
                }
              }}
            />
          ))}
        </section>
      )}
    </div>
  );
}
export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
          <h3 className="text-sm font-medium text-tabs-idle tracking-wide uppercase animate-pulse">
            LOADING EVENTS...
          </h3>
        </div>
      }
    >
      <EventsDashboardContent />
    </Suspense>
  );
}
