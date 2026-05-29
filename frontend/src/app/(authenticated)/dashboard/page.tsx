'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {TabNav} from '@components/TabNav';  
import { EventCard } from '@components/EventCard';
import {StickyButton} from '@components/StickyButton';
import { eventsFrontendService, EventData } from '../../../services/events.frontend';
import Image  from 'next/image';
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

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Tab sincronizing
  const currentTab = parseParamToTab(searchParams.get('tab'));
  const currentParam = parseTabToParam(currentTab); // Devuelve: 'all' | 'future' | 'archived'
  
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Update URL parameter
  const handleTabChange = (selectedTab: string) => {
    setIsLoading(true); // Activa los esqueletos de carga al cambiar de pestaña
    const paramValue = parseTabToParam(selectedTab as TabType);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', paramValue);
    router.push(`?${params.toString()}`);
  };

  // Simulation of data fetching with loading state
  useEffect(() => {
    let isMounted = true;
    
    eventsFrontendService.getDashboardEvents(currentParam as 'all' | 'future' | 'archived')
      .then((data: {events: EventData[]}) => {
        if (isMounted) {
          setEvents(data.events);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Dashboard failed to retrieve view data:", err);
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, [currentParam]);
console.log("Mis eventos son:", events)
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
              key={event.id}
              isLoading={false}
              title={event.title}
              author={event.author || (event.relationship === 'author' ? 'Me (Author)' : 'ReDi Community')}
              date={new Date(event.date) }
              description={event.description}
              attendeeCount={event.attendeeCount ?? 0}
              maxAttendees={event.maxAttendees ?? 50}
              action={
                event.relationship === 'author' 
                  ? 'edit' 
                  : event.relationship === 'joined' 
                    ? 'leave' 
                    : 'join'
              }
              onActionClick={() => console.log(`Acción ejecutada en: ${event.id}`)} // Campo obligatorio agregado
            />
          ))}
        </section>
      )}
    </div>
  );
}