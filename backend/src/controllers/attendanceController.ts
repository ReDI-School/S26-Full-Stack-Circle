import { NextFunction, Request, Response } from 'express';
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
      if (error instanceof Error && error.message === 'EVENT_IN_PAST') {
        res.status(400).json({ error: 'Cannot change participation for a past event' });
        return;
      }
      if (error instanceof Error) {
        if (error.message === 'EVENT_NOT_FOUND') {
          res.status(404).json({ error: 'Event not found' });
          return;
        }
        if (error.message === 'EVENT_FULL') {
          res.status(400).json({ error: 'Event is already at full capacity' });
          return;
        }
        if (error.message === 'ALREADY_REGISTERED') {
          res.status(400).json({ error: 'You are already registered for this event' });
          return;
        }
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async cancelAttendance(req: Request, res: Response, next: NextFunction) {
    try {
      const eventId = req.params.id;
      const userId = req.user!.userId;

      await attendanceService.cancelAttendance(userId, eventId);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === 'EVENT_IN_PAST') {
        res.status(400).json({ error: 'Cannot change participation for a past event' });
        return;
      }
      if (error instanceof Error && error.message === 'NOT_REGISTERED') {
        return res.status(404).json({ error: 'You are not registered for this event' });
      }

      next(error);
    }
  }
}
