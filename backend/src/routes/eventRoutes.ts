import { Router } from 'express';
import { EventController } from '../controllers/eventController.js';

const eventController = new EventController();
const eventRouter = Router();

// TODO: Add authenticate middleware once auth middleware is merged.
eventRouter.post('/', (req, res) => eventController.createEvent(req, res));

export default eventRouter;
