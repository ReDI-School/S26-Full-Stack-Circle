import { Router } from 'express';
import { EventController } from 'src/controllers/eventController.js';
import { authenticate } from 'src/middleware/authenticate.js';
const eventController = new EventController();
const eventRouter = Router();

eventRouter.get('/', (req, res, next) => eventController.getEvents(req, res, next));
eventRouter.put('/:id', authenticate, (req, res, next) =>
  eventController.updateEvent(req, res, next)
);
export default eventRouter;
