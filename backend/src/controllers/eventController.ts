import { Request, Response } from 'express';
import { EventService } from 'src/services/eventService.js';

const eventService = new EventService();

type EventFilter = 'upcoming' | 'past';

function parseEventFilter(value: unknown): {
  isValid: boolean;
  filter?: EventFilter;
} {
  if (value === undefined) {
    return {
      isValid: true,
      filter: undefined,
    };
  }

  if (value === 'upcoming' || value === 'past') {
    return {
      isValid: true,
      filter: value,
    };
  }

  return {
    isValid: false,
  };
}

export class EventController {
  async getEvents(req: Request, res: Response) {
    const { isValid, filter } = parseEventFilter(req.query.filter);

    if (!isValid) {
      return res.status(400).json({
        error: 'Invalid event filter',
      });
    }
    const events = await eventService.getEvents(filter);
    res.json({ events });
  }

  getEventById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user ? req.user.userId : '1';

    const event = await eventService.getEventById(id, userId);

    if (!event) {
      return res.status(404).json({
        error: 'Event not found',
      });
    }

    res.json({ event });
  };
}
