import { Router } from 'express';
import { EventController } from 'src/controllers/eventController.js';
import { authenticate } from 'src/middleware/authenticate.js';
const eventController = new EventController();
const eventRouter = Router();

eventRouter.get('/', (req, res) => eventController.getEvents(req, res));

eventRouter.get('/:id', (req, res) => eventController.getEventById(req, res));

eventRouter.put('/:id', authenticate, (req, res) => eventController.updateEvent(req, res));

export default eventRouter;
