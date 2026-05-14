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
}
