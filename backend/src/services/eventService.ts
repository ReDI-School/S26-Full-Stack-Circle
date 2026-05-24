import prisma from '../libs/prisma.js';
import { Prisma } from 'generated/prisma/client.js';

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

  async createEvent(
    organizerId: string,
    data: {
      title: string;
      description?: string;
      date: Date;
      location: string;
      capacity: number;
    }
  ) {
    return await prisma.event.create({
      data: {
        ...data,
        organizerId,
      },
    });
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
}