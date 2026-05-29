import prisma from '../libs/prisma.js';
import { Prisma } from 'generated/prisma/client.js';


export class EventService {
  async getEvents(userId: string, filter?: 'upcoming' | 'past') {
    const currentDate = new Date();

    const where: Prisma.EventWhereInput | undefined =
      filter === 'upcoming'
        ? { date: { gt: currentDate } }
        : filter === 'past'
          ? { date: { lt: currentDate } }
          : {}; // When it is 'all', no filter by date

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
          where: {
            userId: userId,
          },
        },
        _count: {
          select: {
            attendances: true,
          },
        },
      },
    });

    return events.map((event) => {
      let relationship: 'author' | 'joined' | 'none' = 'none';

      if (event.organizerId === userId) {
        relationship = 'author'; // The owner -> able to EDIT
      } else if (event.attendances.length > 0) {
        relationship = 'joined'; // Is registered -> shows LEAVE
      } // If it doesn't fit any category, stays as 'none' -> shows JOIN      
      return {
        id: event.id,
        title: event.title,
        description: event.description || '',
        date: event.date,
        // Concatenate first and last name of the organizer for display
        author: `${event.organizer.firstName} ${event.organizer.lastName}`,
        attendeeCount: event._count.attendances, // Count of attendees for display
        maxAttendees: event.capacity,
        relationship, // state for UI (author/joined/none)
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
}
