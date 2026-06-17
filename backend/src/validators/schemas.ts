import { z } from 'zod';

// KEEP IN SYNC: This file is duplicated in frontend/src/validators/schemas.ts
// If you change this file, update the other one too.

// Helpers and error message formatting
const errorRequiredField = (field: string) => `'${field}' is a required field.`;

const errorInvalidField = (field: string) => `Please enter a valid ${field.toLocaleLowerCase()}.`;

const trimmedString = z.string().trim();

const validatedEmailField = z.email({ error: errorInvalidField('Email') }).toLowerCase();

// Schemas
const registerSchema = z.object({
  email: validatedEmailField,

  firstName: trimmedString.min(1, { error: errorRequiredField('First name') }),

  lastName: trimmedString.min(1, { error: errorRequiredField('Last name') }),

  password: z
    .string()
    .min(8, { error: 'Password must contain at least 8 characters' })
    .max(100, { error: 'Password must contain at most 100 characters' }) // arbitrary DoS guard for bcrypt
    .refine(
      (val) =>
        /[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val),
      {
        error:
          'Password is weak. Use at least: one uppercase (A-Z), one lowercase (a-z), one digit (0-9), one symbol (!@#…)',
      }
    ),
});

const loginSchema = z.object({
  email: validatedEmailField,
  password: z
    .string(errorInvalidField('Password'))
    .min(1, { error: errorRequiredField('Password') })
    .max(100), // arbitrary DoS guard for bcrypt
});

const createEventSchema = z.object({
  title: trimmedString
    .min(3, { error: 'Event title must contain at least 3 characters' })
    .max(100, { error: 'Event title must contain at most 100 characters' }),

  description: trimmedString
    .min(10, { error: 'Event description must contain at least 10 characters' })
    .max(2000, {
      error: 'Event description must contain at most 2000 characters',
    }),

  location: trimmedString
    .min(3, { error: 'Event location must contain at least 3 characters' })
    .max(200, { error: 'Event location must contain at most 200 characters' }), // in case of full addresses

  capacity: z.coerce
    .number({ error: errorInvalidField('Capacity') })
    .int({ error: 'Capacity must be a whole number' })
    .positive({ error: 'Capacity must be a positive number' }),

  // Frontend combines date+time into a UTC ISO datetime string before sending
  date: z.iso.date({ error: errorInvalidField('Date') }),

  time: z.iso.time({ error: errorInvalidField('Time') }), // expected format HH:MM from <input type="time">

  timezone: trimmedString.min(1, { error: errorRequiredField('Timezone') }),
});

const updateEventSchema = createEventSchema.partial();

export { registerSchema, loginSchema, createEventSchema, updateEventSchema };

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
