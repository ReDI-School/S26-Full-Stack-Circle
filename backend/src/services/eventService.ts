import prisma from '../libs/prisma.js';
import { Prisma } from '../../generated/prisma/client.js';
import type { UpdateEventData, UserEventFilter } from '../types/event.js';
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
  async getEvent(id: string) {
    return await prisma.event.findUnique({
      where: { id },
    });
  }

  async deleteEvent(id: string) {
    return await prisma.event.delete({
      where: { id },
    });
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

  async getEventById(id: string, userId: string) {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        organizer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        attendances: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!event) {
      return null;
    }

    const isOwner = event.organizerId === userId;
    const isAttending = event.attendances.map((attendee) => attendee.user.id).includes(userId);

    return {
      ...event,
      isOwner,
      isAttending,
    };
  }

  async updateEvent(id: string, data: UpdateEventData) {
    return prisma.event.update({
      where: { id },
      data,
    });
  }

  async getEventsByUserId(userId: string, filter: UserEventFilter) {
    const now = new Date();

    const where: Prisma.EventWhereInput =
      filter === 'created'
        ? { organizerId: userId, date: { gte: now } }
        : filter === 'attending'
          ? { attendances: { some: { userId } }, date: { gte: now } }
          : {
              date: { lt: now },
              OR: [{ organizerId: userId }, { attendances: { some: { userId } } }],
            };

    return prisma.event.findMany({
      where,
      orderBy: { date: filter === 'archived' ? 'desc' : 'asc' },
    });
  }
}
