'use client';

import { EventCard } from '@components/EventCard';
import Atendees from '@components/Atendees/Atendees';

export default function eventPage() {
  return (
    <main>
      <div className="w-full flex gap-5">
        <div className="flex-2">
          <EventCard
            isLoading={false}
            action={'join'}
            date={new Date('2017-04-04T14:17:00Z')}
            title={'How to Network'}
            author={'Owner'}
            description={
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
            }
            attendeeCount={10}
            maxAttendees={40}
            onActionClick={() => {}}
          />
        </div>
        <div className="flex-1">
          <Atendees
            atendees={[
              'Santi',
              'Cami1',
              'Cami2',
              'Cami3',
              'Cami4',
              'Cami5',
              'Cami6',
              'Cami7',
              'Cami8',
              'Cami9',
              'Cami10',
              'Cami11',
              'Cami12',
              'Cami13',
              'Cami14',
            ]}
          />
        </div>
      </div>
    </main>
  );
}
