'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TabNav } from '@components/TabNav';
import { EventCard } from '@components/EventCard';
import { StickyButton } from '@components/StickyButton';
import { useDashboardEvents, Relationship } from '@hooks/useDashboard';
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

  const currentTab = parseParamToTab(searchParams.get('tab'));
  const currentParam = parseTabToParam(currentTab);

  const { events, loading, join, leave, pending } = useDashboardEvents(currentParam);

  // Tab change (only URL logic here)
  const handleTabChange = (selectedTab: TabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', parseTabToParam(selectedTab));
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

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8 pb-24 md:pb-8 relative">
      {/* HEADER */}
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
        <section className="flex flex-col items-center justify-center min-h-[300px] text-center gap-4 w-full">
          <Image
            src={imageSrc}
            alt="No events found"
            className="object-contain w-full h-full"
            priority
          />

          <h3 className="text-sm font-medium text-tabs-idle tracking-wide uppercase">
            THERE ARE NO EVENTS TO DISPLAY
          </h3>
        </section>
      )}

      {/* LIST */}
      {!loading && events.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
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
              action={
                currentTab === 'ARCHIVED'
                  ? 'archived'
                  : event.relationship === 'author'
                    ? 'edit'
                    : event.relationship === 'joined'
                      ? 'leave'
                      : 'join'
              }
              isActionPending={pending.has(event.id)}
              onActionClick={() => handleEventAction(event.id, event.relationship)}
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
