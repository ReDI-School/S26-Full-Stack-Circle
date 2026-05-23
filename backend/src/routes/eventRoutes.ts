import { Router } from 'express';
import { EventController } from 'src/controllers/eventController.js';
import { authenticate } from 'src/middleware/authenticate.js';

const eventController = new EventController();
const eventRouter = Router();

eventRouter.get('/', (req, res) => eventController.getEvents(req, res));

// Optional authentication to check ownership
const optionalAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    authenticate(req, res, next);
  } else {
    next();
  }
};

eventRouter.get('/:id', optionalAuth, (req, res) => eventController.getEventById(req, res));

export default eventRouter;
