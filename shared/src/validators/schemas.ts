import { z } from 'zod';

const errorRequiredField = (field: string) => `${field} is required.`;

//TODO: add data sanitation to avoid melicious inputs, e.g. trim strings, escape special characters, etc.

const registerSchema = z.object({
  email: z.email().trim().toLowerCase(),

  firstName: z
    .string()
    .trim()
    .min(1, { error: errorRequiredField('First name') }),

  lastName: z
    .string()
    .trim()
    .min(1, { error: errorRequiredField('Last name') }),

  password: z
    .string()
    .trim()
    .min(8, { error: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { error: 'Password must contain an uppercase letter' })
    .regex(/[a-z]/, { error: 'Password must contain a lowercase letter' })
    .regex(/[0-9]/, { error: 'Password must contain a digit' })
    .regex(/[^A-Za-z0-9]/, {
      error: 'Password must contain a special character',
    }),
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
    .min(1, { error: errorRequiredField('Event title') }),

  description: z
    .string()
    .trim()
    .min(1, { error: errorRequiredField('Event description') }),

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
