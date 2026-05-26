import prisma from 'src/libs/prisma.js';

export class AttendanceService {
   async getAttendees(eventId: string) {
    const attendances = await prisma.attendance.findMany({
      where: {
        eventId: eventId,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return attendances.map((a) => a.user);
   }

  async attend(userId: string, eventId: string) {
    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!event) {
      throw new Error('EVENT_NOT_FOUND');
    }

    const count = await prisma.attendance.count({ where: { eventId } });

    if (count >= event.capacity) {
      throw new Error('EVENT_FULL');
    }

    const existing = await prisma.attendance.count({ where: { userId, eventId } });
    if (existing > 0) throw new Error('ALREADY_REGISTERED');

    return await prisma.attendance.create({
      data: { userId, eventId },
    });
  }
}
