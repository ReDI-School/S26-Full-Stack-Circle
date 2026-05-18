import { Router } from 'express';
import { EventController } from '../controllers/eventController.js';
import { authenticate } from '../middleware/authenticate.js';

const eventController = new EventController();
const eventRouter = Router();

eventRouter.get('/', (req, res, next) => eventController.getEvents(req, res, next));
eventRouter.delete('/:id', authenticate, (req, res) => eventController.deleteEvent(req, res));

export default eventRouter;
