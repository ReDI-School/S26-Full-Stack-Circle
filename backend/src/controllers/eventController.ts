import { Request, Response } from 'express';
import { AttendanceService } from 'src/services/attendanceService.js';
import { EventService } from '../services/eventService.js';

const eventService = new EventService();
const attendanceService = new AttendanceService();
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

  async getAttendees(req: Request, res: Response) {
    const eventId = req.params.id;
    const event = await eventService.getEventById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event does not exist' });
    }

    const attendees = await attendanceService.getAttendees(eventId);

    res.json({ attendees });
  }
  
  async createEvent(req: Request, res: Response) {
    const { title, description, date, location, capacity } = req.body;
    const organizerId = req.user?.userId;

    if (!organizerId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const event = await eventService.createEvent(organizerId, {
      title,
      description,
      date: new Date(date),
      location,
      capacity,
    });

    res.status(201).json({ event });
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
}
