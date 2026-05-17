import { Router } from 'express';
import { EventController } from '../controllers/eventController.js';
import { AttendanceController } from '../controllers/attendanceController.js';
import { authenticate } from '../middleware/authenticate.js';

const eventController = new EventController();
const attendanceController = new AttendanceController();
const eventRouter = Router();

eventRouter.post('/:id/attend', authenticate, (req, res) => attendanceController.attend(req, res));
eventRouter.get('/', (req, res) => eventController.getEvents(req, res));
eventRouter.get('/:id', (req, res) => eventController.getEventById(req, res));
eventRouter.put('/:id', authenticate, (req, res) => eventController.updateEvent(req, res));
export default eventRouter;
