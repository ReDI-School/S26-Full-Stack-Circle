import { Request, Response } from 'express';
import { EventService } from '../services/eventService.js';

const eventService = new EventService();

export class EventController {
  getEventById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const event = await eventService.getEventById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ event });
  };
}

export default EventController;
