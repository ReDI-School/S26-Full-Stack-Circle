import { Request, Response } from 'express';
import { EventService } from '../services/eventService.js';
import { NextFunction } from 'express';

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

    const event = await eventService.getEventById(id);

    if (!event) {
      return res.status(404).json({
        error: 'Event not found',
      });
    }

    res.json({ event });
  };
  async updateEvent(req: Request, res: Response, next: NextFunction) {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date ? new Date(req.body.date) : undefined,
      location: req.body.location,
      capacity: req.body.capacity,
    };
    try {
      const eventId = req.params.id;
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const event = await eventService.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      if (event.organizerId !== userId) {
        return res.status(403).json({
          error: 'You are not allowed to update this event',
        });
      }
      const updatedEvent = await eventService.updateEvent(eventId, updateData);
      return res.status(200).json(updatedEvent);
    } catch (err) {
      next(err);
    }
  }
}
