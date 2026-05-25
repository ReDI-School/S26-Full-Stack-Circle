import { Router } from 'express';
import { EventController } from 'src/controllers/eventController.js';

const eventController = new EventController();
const eventRouter = Router();

eventRouter.get('/', (req, res) => eventController.getEvents(req, res));
eventRouter.get('/:id/attendees', (req, res) => eventController.getAttendees(req, res));
eventRouter.get('/:id', (req, res) => eventController.getEventById(req, res));

export default eventRouter;
