import prisma from '../libs/prisma.js';

export class AttendanceService {
  async attend(userId: string, eventId: string) {
    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!event) {
      throw new Error('EVENT_NOT_FOUND');
    }

    const count = await prisma.attendance.count({ where: { eventId } });

    if (count >= event.capacity) {
      throw new Error('EVENT_FULL');
    }

    return await prisma.attendance.create({
      data: { userId, eventId },
    });
  }
}
