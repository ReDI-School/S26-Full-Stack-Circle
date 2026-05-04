import { Request, Response } from 'express';
import { EventService } from 'src/services/eventService.js';

const eventService = new EventService();

type EventFilter = 'upcoming' | 'past' | undefined;

function isEventFilter(value: unknown): value is EventFilter {
  return value === 'upcoming' || value === 'past' || value === undefined;
}

export class EventController {
  async getEvents(req: Request, res: Response) {
    try {
      const rawFilter = req.query.filter;

      if (rawFilter && !isEventFilter(rawFilter)) {
        return res.status(400).json({ error: 'Invalid filter. Use "upcoming" or "past".' });
      }

      const filter = rawFilter === 'upcoming' || rawFilter === 'past' ? rawFilter : undefined;

      const events = await eventService.getEvents(filter);

      res.json({ events });
    } catch (error) {
      console.error('Error fetching events:', error);

      res.status(500).json({ error: 'Failed to fetch events' });
    }
  }
}
