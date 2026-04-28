import { Request, Response } from 'express';
import { EventService } from '../services/eventService.js';

const eventService = new EventService();

export class EventController {
  async createEvent(req: Request, res: Response) {
    try {
      // TODO: Replace body organizerId with req.user.userId once auth middleware is merged.
      const { title, description, date, location, capacity, organizerId } = req.body;

      const event = await eventService.createEvent(organizerId, {
        title,
        description,
        date: new Date(date),
        location,
        capacity,
      });

      res.status(201).json({ event });
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  }
}
