import { z } from 'zod';

const trimmedString = z.string().trim();
const errorRequiredField = (field: string) => `${field} is required.`;

const registerSchema = z.object({
  email: z.email().trim().toLowerCase(),

  firstName: trimmedString.min(1, { error: errorRequiredField('First name') }),

  lastName: trimmedString.min(1, { error: errorRequiredField('Last name') }),

  password: z
    .string()
    .min(8, { error: 'Password must be at least 8 characters' })
    .max(100, { error: 'Password must be at most 100 characters' }) // arbitrary DoS guard for bcrypt
    .regex(/[A-Z]/, { error: 'Password must contain an uppercase letter' })
    .regex(/[a-z]/, { error: 'Password must contain a lowercase letter' })
    .regex(/[0-9]/, { error: 'Password must contain a digit' })
    .regex(/[^A-Za-z0-9]/, {
      error: 'Password must contain a special character',
    }),
});

const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z
    .string()
    .min(1, { error: errorRequiredField('Password') })
    .max(100), // arbitrary DoS guard for bcrypt
});

const createEventSchema = z.object({
  title: trimmedString
    .min(3, { error: 'Event title must be at least 3 characters' })
    .max(100, { error: 'Event title must be at most 100 characters' }),

  description: trimmedString
    .min(10, { error: 'Event description must be at least 10 characters' })
    .max(2000, { error: 'Event description must be at most 2000 characters' }),

  capacity: z
    .number({ error: errorRequiredField('Capacity') })
    .int({ error: 'Capacity must be a whole number' })
    .positive({ error: 'Capacity must be a positive number' }),

  date: z.iso.date({ error: 'Invalid date format' }), // expected format YYYY-MM-DD from <input type="date">

  time: z.iso.time({ error: 'Invalid time format' }), // expected format HH:MM from <input type="time">
});

const updateEventSchema = createEventSchema.partial();

export { registerSchema, loginSchema, createEventSchema, updateEventSchema };
