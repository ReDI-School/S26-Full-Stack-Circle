import prisma from '../libs/prisma.js';
import { Prisma } from 'generated/prisma/client.js';
import type { UpdateEventData } from '../types/event.js';
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

    // Add isOwner field
    const isOwner = event.organizerId === userId;
    const isAtending = event.attendances.map((atendee) => atendee.user.id).includes(userId);

    return {
      ...event,
      isOwner,
      isAtending,
    };
  }

  async updateEvent(id: string, data: UpdateEventData) {
    return prisma.event.update({
      where: { id },
      data,
    });
  }
}
