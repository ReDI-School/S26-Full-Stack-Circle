import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { AttendanceService } from '../services/attendanceService.js';
import { EventService } from '../services/eventService.js';
import type { UpdateEventData } from '../types/event.js';

const eventService = new EventService();
const attendanceService = new AttendanceService();
type EventFilter = 'upcoming' | 'past';
const DEFAULT_EVENT_TIME_ZONE = 'Europe/Berlin';

/**
 * This function compose a local calendar
 *  date and local clock time into a UTC Date.
 *
 * Expected inputs:
 * `date`: `yyyy-MM-dd`
 * `time`: optional `HH:mm`, defaults to `00:00`
 * `timezone`: IANA timezone (example: `Europe/Berlin`)
 */
function composeEventDateTime(
  date: string,
  time?: string,
  timezone: string = DEFAULT_EVENT_TIME_ZONE
): Date {
  const input = `${date} ${time ?? '00:00'}`;
  const localDateTime = DateTime.fromFormat(input, 'yyyy-MM-dd HH:mm', { zone: timezone });

  if (!localDateTime.isValid) {
    throw new Error(`Invalid event date/time input: ${localDateTime.invalidExplanation || input}`);
  }

  return localDateTime.toUTC().toJSDate();
}

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
    //Are we going to use this endpoint?
    //There's a circular dependency between getAttendees and getEventById;

    if (!event) {
      return res.status(404).json({ error: 'Event does not exist' });
    }

    const attendees = await attendanceService.getAttendees(eventId);

    res.json({ attendees });
  }

  async createEvent(req: Request, res: Response) {
    const { title, description, date, time, location, capacity, timezone } = req.body;
    const organizerId = req.user?.userId;

    if (!organizerId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const event = await eventService.createEvent(organizerId, {
      title,
      description,
      date: composeEventDateTime(date, time, timezone),
      location,
      capacity,
    });

    res.status(201).json({ event });
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
    const timezone = typeof req.query.timezone === 'string' ? req.query.timezone : undefined;

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

    if (timezone) {
      const localDateTime = DateTime.fromJSDate(event.date, { zone: 'utc' }).setZone(timezone);

      return res.json({
        event: {
          ...event,
          formDate: localDateTime.toFormat('yyyy-MM-dd'),
          formTime: localDateTime.toFormat('HH:mm'),
        },
      });
    }

    return res.json({ event });
  };

  async updateEvent(req: Request, res: Response) {
    const eventId = req.params.id;
    const userId = req.user!.userId;

    const event = await eventService.getEventById(eventId, userId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.organizerId !== userId) {
      return res.status(403).json({
        error: 'You are not allowed to update this event',
      });
    }

    let composedDate: Date | undefined;

    if (req.body.date || req.body.time) {
      const timezone = req.body.timezone || DEFAULT_EVENT_TIME_ZONE;
      const localEventTime = DateTime.fromJSDate(event.date, { zone: 'utc' }).setZone(timezone);
      const datePart = req.body.date ?? localEventTime.toFormat('yyyy-MM-dd');
      const timePart = req.body.time ?? localEventTime.toFormat('HH:mm');
      composedDate = composeEventDateTime(datePart, timePart, timezone);
    }

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
}
