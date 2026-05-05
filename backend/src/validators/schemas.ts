import { z } from 'zod';

const errorRequiredField = (field: string) => `${field} is required.`;

const registerSchema = z.object({
  email: z.email().trim().toLowerCase(),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  // TODO:password rules
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  // TODO: do i need a password rule here at login?
  password: z.string().min(8),
});

const createEventSchema = z.object({
  // TODO: add more specific validation rules, e.g. title and description min/max length
  // TODO: add missing error messages for each field, e.g. "Capacity must be a positive integer", etc.
  title: z
    .string()
    .trim()
    .min(1, { error: errorRequiredField('Title') }),

  description: z
    .string()
    .trim()
    .min(1, { error: errorRequiredField('Description') }),

  capacity: z
    .number()
    .int()
    .positive()
    .min(1, { error: errorRequiredField('Capacity') }),

  date: z.iso.date({ error: 'Invalid date format' }), // expected format YYYY-MM-DD from <input type="date">

  time: z.iso.time({ error: 'Invalid time format' }), // expected format HH:MM from <input type="time">
});

const updateEventSchema = createEventSchema.partial();

export { registerSchema, loginSchema, createEventSchema, updateEventSchema };
