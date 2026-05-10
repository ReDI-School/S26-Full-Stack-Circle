import { Router } from 'express';
import { EventController } from '../controllers/eventController.js';

const eventController = new EventController();
const eventRouter = Router();

eventRouter.get('/', (req, res, next) => eventController.getEvents(req, res, next));
eventRouter.delete('/:id', (req, res) => eventController.deleteEvent(req, res));

export default eventRouter;
