import { Router } from 'express';
import { EventController } from '../controllers/eventController.js';
import { authenticate } from '../middleware/authenticate.js';

const eventController = new EventController();
const eventRouter = Router();

eventRouter.get('/', (req, res, next) => eventController.getEvents(req, res, next));
eventRouter.post('/', authenticate, (req, res) => eventController.createEvent(req, res));
eventRouter.get('/:id', (req, res) => eventController.getEventById(req, res));

export default eventRouter;
