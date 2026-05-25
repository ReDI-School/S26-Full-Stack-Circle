import { Router } from 'express';
import { EventController } from '../controllers/eventController.js';
import { AttendanceController } from '../controllers/attendanceController.js';
import { authenticate } from '../middleware/authenticate.js';

const eventController = new EventController();
const attendanceController = new AttendanceController();
const eventRouter = Router();

eventRouter.get('/', (req, res, next) => eventController.getEvents(req, res, next));
eventRouter.post('/', authenticate, (req, res) => eventController.createEvent(req, res));
eventRouter.post('/:id/attend', authenticate, (req, res) => attendanceController.attend(req, res));
eventRouter.get('/:id', (req, res) => eventController.getEventById(req, res));

export default eventRouter;
