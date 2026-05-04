import { Router } from 'express';
import { EventController } from 'src/controllers/eventController.js';

const eventController = new EventController();
const eventRouter = Router();

eventRouter.get('/', (req, res) => eventController.getEvents(req, res));

export default eventRouter;
