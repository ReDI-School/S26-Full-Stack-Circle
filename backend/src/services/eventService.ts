import prisma from 'src/libs/prisma.js';
import { Prisma } from 'generated/prisma/client.js';
export class EventService {
  async getEvents(filter?: 'upcoming' | 'past') {
    // If filter is 'upcoming', return events where date is in the future
    // If filter is 'past', return events where date is in the past
    // Otherwise return all events
    // Hint: use a `where` clause with Prisma's `gt` (greater than) and `lt` (less than) operators
    /** your logic goes here **/
    const currentDate = new Date();

    const where: Prisma.EventWhereInput | undefined =
      filter === 'upcoming'
        ? { date: { gt: currentDate } }
        : filter === 'past'
          ? { date: { lt: currentDate } }
          : undefined;

    const events = await prisma.event.findMany({
      where,
      include: {
        organizer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return events;
  }
}
