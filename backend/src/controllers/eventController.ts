import { Request, Response, NextFunction } from 'express';
import { EventService } from '../services/eventService.js';

const eventService = new EventService();

type EventFilter = 'upcoming' | 'past';

function parseEventFilter(value: unknown): EventFilter | undefined {
  if (value === undefined) return undefined;
  if (value === 'upcoming' || value === 'past') return value;

  throw new Error('INVALID_EVENT_FILTER');
}

export class EventController {
  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const filter = parseEventFilter(req.query.filter);
      const events = await eventService.getEvents(filter);
      res.json({ events });
    } catch (err) {
      next(err);
    }
  }

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
