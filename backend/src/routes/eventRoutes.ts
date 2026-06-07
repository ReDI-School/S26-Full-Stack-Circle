import { Router } from 'express';
import { EventController } from '../controllers/eventController.js';
import { AttendanceController } from '../controllers/attendanceController.js';
import { authenticate } from '../middleware/authenticate.js';
import { createEventSchema, updateEventSchema } from '../validators/schemas.js';
import { validate } from '../middleware/validateUserInput.js';

const eventController = new EventController();
const attendanceController = new AttendanceController();
const eventRouter = Router();

eventRouter.get('/', authenticate, (req, res) => eventController.getEvents(req, res));
eventRouter.get('/:id/attendees', (req, res) => eventController.getAttendees(req, res));
eventRouter.delete('/:id', authenticate, (req, res) => eventController.deleteEvent(req, res));
eventRouter.post('/', authenticate, validate(createEventSchema), (req, res) =>
  eventController.createEvent(req, res)
);
eventRouter.post('/:id/attend', authenticate, (req, res) => attendanceController.attend(req, res));
eventRouter.delete('/:id/attend', authenticate, (req, res, next) =>
  attendanceController.cancelAttendance(req, res, next)
);
eventRouter.get('/:id', (req, res) => eventController.getEventById(req, res));
eventRouter.put('/:id', authenticate, validate(updateEventSchema), (req, res) =>
  eventController.updateEvent(req, res)
);

export default eventRouter;
