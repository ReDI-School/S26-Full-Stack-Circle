import prisma from '../libs/prisma.js';
import { Prisma } from 'generated/prisma/client.js';
import type { UpdateEventData } from '../types/event.js';
export class EventService {
  // List all events, filtering based on the provided criteria.
  // Receive the currentUserId to determine if the user is the author of any event, which is needed for the frontend to display the correct relationship status (author/joined/none).
  async getEvents(currentUserId: string, filter?: 'upcoming' | 'past') {
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
        attendances: {
          select: {
            userId: true,
          },
        },
      },
    });

    return events.map((event) => {
      const isAuthor = event.organizerId === currentUserId;
      // Verify if the current user is in the attendances of this event
      const isJoined = event.attendances?.some((a) => a.userId === currentUserId) || false;

      return {
        id: event.id,
        title: event.title,
        date: event.date,
        description: event.description || '',
        relationship: isAuthor ? 'author' : isJoined ? 'joined' : 'none',
        author: `${event.organizer.firstName} ${event.organizer.lastName}`,
        attendeeCount: event.attendances?.length || 0,
        maxAttendees: event.capacity,
      };
    });
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
