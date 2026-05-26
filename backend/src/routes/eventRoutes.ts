import { Router } from 'express';
import { EventController } from '../controllers/eventController.js';
import { AttendanceController } from '../controllers/attendanceController.js';
import { authenticate } from '../middleware/authenticate.js';

const eventController = new EventController();
const attendanceController = new AttendanceController();
const eventRouter = Router();

eventRouter.post('/:id/attend', authenticate, (req, res) => attendanceController.attend(req, res));
eventRouter.get('/', (req, res) => eventController.getEvents(req, res));

// Optional authentication to check ownership
const optionalAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    authenticate(req, res, next);
  } else {
    next();
  }
};

eventRouter.get('/:id', optionalAuth, (req, res) => eventController.getEventById(req, res));

export default eventRouter;
