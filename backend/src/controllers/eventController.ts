import { Request, Response } from 'express';
import { EventService } from '../services/eventService.js';

const eventService = new EventService();

export class EventController {
  async createEvent(req: Request, res: Response) {
    try {
      const { title, description, date, location, capacity } = req.body;
      const organizerId = req.user.userId;

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
