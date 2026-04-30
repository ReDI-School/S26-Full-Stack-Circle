import { Router } from 'express';
import { EventController } from '../controllers/eventController.js';

const eventController = new EventController();
const eventRouter = Router();

eventRouter.get('/:id', (req, res) => eventController.getEventById(req, res));

export default eventRouter;
