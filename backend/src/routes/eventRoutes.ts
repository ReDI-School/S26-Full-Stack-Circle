import { Router } from 'express';
import { EventController } from '../controllers/eventController.js';
import { authenticate } from '../middleware/authenticate.js';

const eventController = new EventController();
const eventRouter = Router();

eventRouter.post('/', authenticate, (req, res) => eventController.createEvent(req, res));

export default eventRouter;
