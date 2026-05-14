import { Router } from 'express';
import { EventController } from 'src/controllers/eventController.js';

const eventController = new EventController();
const eventRouter = Router();

eventRouter.get('/', (req, res, next) => eventController.getEvents(req, res, next));

eventRouter.get('/:id', (req, res, next) => eventController.getEventById(req, res, next));

export default eventRouter;
