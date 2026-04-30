import prisma from '../libs/prisma.js';

export class EventService {
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
