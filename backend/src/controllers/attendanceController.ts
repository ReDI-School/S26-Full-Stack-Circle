import { Request, Response } from 'express';
import { AttendanceService } from '../services/attendanceService.js';

const attendanceService = new AttendanceService();

export class AttendanceController {
  async attend(req: Request, res: Response) {
    try {
      const eventId = req.params.id;
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const attendance = await attendanceService.attend(userId, eventId);
      res.status(201).json({ attendance });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'EVENT_NOT_FOUND') {
          res.status(404).json({ error: 'Event not found' });
          return;
        }
        if (error.message === 'EVENT_FULL') {
          res.status(400).json({ error: 'Event is already at full capacity' });
          return;
        }
      }
      // Prisma unique constraint violation = already registered
      res.status(400).json({ error: 'You are already registered for this event' });
    }
  }
}
