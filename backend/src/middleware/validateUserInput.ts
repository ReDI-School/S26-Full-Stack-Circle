import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Use schema.safeParse(req.body)
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const schemaErrors = result.error.issues; // an array of validation problems, e.g. [{ path: ['email'], message: 'Invalid email' }]
      console.log(schemaErrors);
      // TODO: test errors!

      // If it fails, return 400 with the validation errors
      return res.status(400).json({ errors: schemaErrors });
    } else {
      // result.data is the validated and typed data logged
      console.log(result.data);
      // If it passes, call next()
      next();
    }
  };
}
