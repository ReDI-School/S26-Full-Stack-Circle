import { Request, Response } from 'express';
import { EventService } from 'src/services/eventService.js';

const eventService = new EventService();

type EventFilter = 'upcoming' | 'past';

function parseEventFilter(value: unknown): EventFilter | undefined {
  if (value === undefined) return undefined;
  if (value === 'upcoming' || value === 'past') return value;

  throw new Error('INVALID_EVENT_FILTER');
}

export class EventController {
  async getEvents(req: Request, res: Response) {
    try {
      const filter = parseEventFilter(req.query.filter);
      const events = await eventService.getEvents(filter);
      res.json({ events });
    } catch (error) {
      if (error instanceof Error && error.message === 'INVALID_EVENT_FILTER') {
        return res.status(400).json({
          error: 'Invalid filter. Use "upcoming" or "past".',
        });
      }

      console.error('Error fetching events:', error);

      res.status(500).json({
        error: 'Failed to fetch events',
      });
    }
  }
}
