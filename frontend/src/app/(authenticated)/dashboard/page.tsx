'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {TabNav} from '@components/TabNav';  
import { EventCard } from '@components/EventCard';
import {StickyButton} from '@components/StickyButton';

// --- 1. TIPADO ESTRICTO CON TYPESCRIPT ---
export type TabType = 'ALL EVENTS' | 'FUTURE EVENTS' | 'ARCHIVED';
export type UserRelationship = 'author' | 'joined' | 'none';

export interface EventData {
  id: string;
  title: string;
  date: string;
  description: string;
  relationship: UserRelationship;
}

// --- 2. (MOCK DATA) ---
const MOCK_EVENTS: EventData[] = [
  { id: '1', title: 'ReDi Tech Talk 2026', date: '2026-06-15', description: 'Annual tech conference.', relationship: 'author' },
  { id: '2', title: 'Next.js Workshop', date: '2026-07-20', description: 'Deep dive into App Router.', relationship: 'joined' },
  { id: '3', title: 'Tailwind CSS Meetup', date: '2026-08-05', description: 'Styling at scale.', relationship: 'none' },
  { id: '4', title: 'Past Node.js Summit', date: '2025-12-10', description: 'Backend architectures.', relationship: 'none' },
];

// --- 3. (URL PARAMS <-> UI TABS) ---
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

// --- 4. Page ---
export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Tab sincronizing
  const currentTab = parseParamToTab(searchParams.get('tab'));

  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Update URL parameter
  const handleTabChange = (selectedTab: string) => {
    const paramValue = parseTabToParam(selectedTab as TabType);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', paramValue);
    router.push(`?${params.toString()}`);
  };

  // Simulation of data fetching with loading state
  useEffect(() => {
    
    
    const fetchMockData = () => {
      let filtered = MOCK_EVENTS;
      const today = new Date('2026-05-21'); 

      if (currentTab === 'FUTURE EVENTS') {
        filtered = MOCK_EVENTS.filter(e => new Date(e.date) >= today);
      } else if (currentTab === 'ARCHIVED') {
        filtered = MOCK_EVENTS.filter(e => new Date(e.date) < today);
      }

      setEvents(filtered);
      setIsLoading(false);
    };

    // Relay simulated fetch with a timeout
    const timer = setTimeout(fetchMockData, 800);
    return () => clearTimeout(timer);
  }, [currentTab]);

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
            onClick={() => router.push('/dashboard/create-event')}
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
          {/* Círculo tachado color Teal */}
          <svg className="w-16 h-16 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <h3 className="text-xl font-bold text-gray-700 tracking-wide uppercase">
            THERE ARE NO EVENTS TO DISPLAY
          </h3>
        </section>
      )}

      {/* 3. (LOADED STATE)*/}
      {!isLoading && events.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {events.map((event) => (
            <EventCard 
              key={event.id}
              isLoading={false}
              title={event.title}
              author={event.relationship === 'author' ? 'Me (Author)' : 'ReDi Community'}
              date={new Date(event.date) }
              description={event.description}
              attendeeCount={0}
              maxAttendees={50}
              action={event.relationship === 'author' ? 'edit' : 'join'}
              onActionClick={() => console.log(`Acción ejecutada en: ${event.id}`)} // Campo obligatorio agregado
            />
          ))}
        </section>
      )}
    </div>
  );
}