import { Router } from 'express';
// import { EventController } from 'src/controllers/eventController.js';
import { EventController } from '../controllers/eventController.js';

const eventController = new EventController();
const eventRouter = Router();

eventRouter.get('/', (req, res, next) => eventController.getEvents(req, res, next));
eventRouter.delete('/:id', (req, res, next) => eventController.deleteEvent(req, res, next));

export default eventRouter;
