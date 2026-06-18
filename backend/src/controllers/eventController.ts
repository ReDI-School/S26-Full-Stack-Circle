import { Request, Response } from 'express';
import { AttendanceService } from '../services/attendanceService.js';
import { EventService } from '../services/eventService.js';
import type { UpdateEventData } from '../types/event.js';

const eventService = new EventService();
const attendanceService = new AttendanceService();
const eventDateService = new EventDateService();

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

    const userId = req.user?.userId || '';
    const events = await eventService.getEvents(userId, filter);

    return res.json({ events });
  }

  async getAttendees(req: Request, res: Response) {
    const eventId = req.params.id;
    const event = await eventService.getEventById(eventId, '1');

    if (!event) {
      return res.status(404).json({ error: 'Event does not exist' });
    }

    const attendees = await attendanceService.getAttendees(eventId);

    return res.json({ attendees });
  }

  async createEvent(req: Request, res: Response) {
    const { title, description, date, time, location, capacity } = req.body;

    const timezone = getTimezone(req);

    if (!timezone) {
      return res.status(400).json({ error: 'Timezone required' });
    }

    const organizerId = req.user?.userId;

    if (!organizerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const event = await eventService.createEvent(organizerId, {
      title,
      description,
      date: eventDateService.localToUtc({
        date,
        time,
        timezone,
      }),
      location,
      capacity,
    });

    return res.status(201).json({ event });
  }

  async deleteEvent(req: Request, res: Response) {
    const { id } = req.params;

    const event = await eventService.getEvent(id);

    if (!event) {
      return res.status(404).send();
    }

    if (event.organizerId !== req.user?.userId) {
      return res.status(403).json({ error: 'Not your event' });
    }

    await eventService.deleteEvent(id);

    return res.status(204).send();
  }

  getEventById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.userId;

    const timezone = getTimezone(req) || DEFAULT_EVENT_TIME_ZONE;

    if (!userId) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    const event = await eventService.getEventById(id, userId);

    if (!event) {
      return res.status(404).json({
        error: 'Event not found',
      });
    }

    const { formDate, formTime } = eventDateService.formatForForm({
      date: event.date,
      timezone,
    });

    return res.json({
      event: {
        ...event,
        formDate,
        formTime,
      },
    });
  };

  async updateEvent(req: Request, res: Response) {
    const eventId = req.params.id;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const timezone = getTimezone(req);

    if (!timezone) {
      return res.status(400).json({ error: 'Timezone required' });
    }

    const event = await eventService.getEventById(eventId, userId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.organizerId !== userId) {
      return res.status(403).json({
        error: 'You are not allowed to update this event',
      });
    }

    const composedDate = eventDateService.resolveUpdatedDate({
      existingDate: event.date,
      bodyDate: req.body.date,
      bodyTime: req.body.time,
      timezone,
    });

    const updateData: UpdateEventData = {
      title: req.body.title,
      description: req.body.description,
      date: composedDate,
      location: req.body.location,
      capacity: req.body.capacity,
    };

    const updatedEvent = await eventService.updateEvent(eventId, updateData);

    return res.status(200).json({ event: updatedEvent });
  }

  async getEventsByUserId(req: Request, res: Response): Promise<Response> {
    const userId = req.user!.userId;

    const { isValid, filter } = parseUserEventFilter(req.query.filter);

    if (!isValid || !filter) {
      return res.status(400).json({
        error: 'Invalid or missing event filter. Must be one of: created, attending, archived',
      });
    }

    const events = await eventService.getEventsByUserId(userId, filter);
    return res.json({ events });
  }
}
