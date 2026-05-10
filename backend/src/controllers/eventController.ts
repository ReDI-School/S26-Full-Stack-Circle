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

  async deleteEvent(req: Request, res: Response) {
    // 1. Find the event by id — return 404 if not found
    // 2. Check that event.organizerId matches req.user.userId — return 403 if not
    // 3. Call the service
    // 4. Return 204 on success
    /** your logic goes here **/

    const { id } = req.params;
    const event = await eventService.getEvent(id);
    if (!event) {
      return res.status(404);
    }

    if (event.organizerId !== req.user?.userId) {
      return res.status(403).json({ error: 'Not your event' });
    }

    await eventService.deleteEvent(id);
  }
}
