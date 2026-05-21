import prisma from 'src/libs/prisma.js';
import { Prisma } from 'generated/prisma/client.js';

type UpdateEventData = {
  title?: string;
  description?: string | null;
  date?: Date;
  location?: string;
  capacity?: number;
};

export class EventService {
  async getEvents(filter?: 'upcoming' | 'past') {
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
  async getEventById(id: string) {
    return await prisma.event.findUnique({
      where: { id },
      include: {
        organizer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }
  async updateEvent(id: string, data: UpdateEventData) {
    return prisma.event.update({
      where: { id },
      data,
    });
  }
}
