'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TabNav } from '@components/TabNav';
import { EventCard } from '@components/EventCard';
import { StickyButton } from '@components/StickyButton';
import { Button } from '@components/Button';
import { useDashboardEvents, Relationship } from '@hooks/useDashboard';
import { TabType as HookTabType } from '@hooks/useDashboard';
import Image from 'next/image';
import imageSrc from '../../../assets/images/empty-state.png';

export type TabType = 'ALL EVENTS' | 'FUTURE EVENTS' | 'ARCHIVED';

const parseParamToTab = (param: string | null): TabType => {
  if (param === 'future') return 'FUTURE EVENTS';
  if (param === 'archived') return 'ARCHIVED';
  return 'ALL EVENTS';
};

const parseTabToParam = (tab: TabType): HookTabType => {
  if (tab === 'FUTURE EVENTS') return 'future';
  if (tab === 'ARCHIVED') return 'archived';
  return 'all';
};

type EventAction = 'archived' | 'edit' | 'leave' | 'join';
const now = new Date();

function getEventAction(
  relationship: Relationship,
  eventDate: Date,
  currentTab: TabType
): EventAction {
  if (currentTab === 'ARCHIVED') return 'archived';

  const isPast = eventDate < now;
  if (isPast) return 'archived';

  if (relationship === 'author') return 'edit';
  if (relationship === 'joined') return 'leave';
  return 'join';
}

function EventsDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = parseParamToTab(searchParams.get('tab'));
  const currentParam = parseTabToParam(currentTab);

  const { events, loading, join, leave, pending } = useDashboardEvents(currentParam);

  console.log('EVENTS: ', events);

  // Tab change (only URL logic here)
  const handleTabChange = (selectedTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', parseTabToParam(selectedTab as TabType));
    router.push(`?${params.toString()}`);
  };

  // Event action (thin controller)
  const handleEventAction = (id: string, rel: Relationship) => {
    if (rel === 'author') {
      router.push(`/events/${id}/edit`);
      return;
    }

    if (rel === 'none') join(id);
    else leave(id);
  };

  const handleCreateEvent = () => {
    router.push('/create-event');
  };

  return (
    <div className="size-full flex flex-col pb-24 md:pb-8">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-4 mb-8 w-full">
        <div className="w-full md:w-auto">
          <TabNav
            activeTab={currentTab}
            onTabChange={handleTabChange}
            tabs={['ALL EVENTS', 'FUTURE EVENTS', 'ARCHIVED']}
          />
        </div>

        <div className="hidden sm:block">
          <Button onClick={handleCreateEvent} size="default" variant="idle">
            CREATE NEW EVENT
          </Button>
        </div>
        <StickyButton onClick={handleCreateEvent} label="CREATE NEW EVENT"></StickyButton>
      </header>

      {/* LOADING */}
      {loading && (
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

      {/* EMPTY */}
      {!loading && events.length === 0 && (
        <section className="flex-1 flex flex-col items-center justify-center text-center gap-4 w-full">
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

      {/* LIST */}
      {!loading && events.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pb-20 sm:pb-8">
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              isLoading={false}
              title={event.title}
              author={
                event.author || (event.relationship === 'author' ? 'Me (Author)' : 'ReDi Community')
              }
              date={new Date(event.date)}
              description={event.description}
              attendeeCount={event.attendeeCount ?? 0}
              maxAttendees={event.maxAttendees ?? 50}
              interactive={true}
              action={getEventAction(event.relationship, new Date(event.date), currentTab)}
              isActionPending={pending.has(event.id)}
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
