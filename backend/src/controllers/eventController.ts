import { Request, Response } from 'express';
import { EventService } from 'src/services/eventService.js';
import { NextFunction } from 'express';

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
      console.log('Error caught:', err);
      console.log('Error type:', err instanceof Error);
      console.log('Error message:', (err as Error).message);
      next(err);
    }
  }
  getEventById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const event = await eventService.getEventById(id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.json({ event });
    } catch (err) {
      next(err);
    }
  };
}
