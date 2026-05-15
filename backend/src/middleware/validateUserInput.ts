import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const schemaErrorsAll = result.error.issues;

      const schemaErrorsClient = schemaErrorsAll.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })); // client-friendly error format

      console.log(schemaErrorsAll);
      return res.status(400).json({ errors: schemaErrorsClient });
    } else {
      req.body = result.data; // sanitised data is reaasigned to req.body, so that downstream handlers get the cleaned data with correct types, e.g. capacity as number, date as Date, etc.
      console.log(req.body);
      next();
    }
  };
}
