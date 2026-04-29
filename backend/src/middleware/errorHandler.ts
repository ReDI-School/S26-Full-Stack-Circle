import { NextFunction, Request, Response } from 'express';

export function notFound(req: Request, res: Response) {
  return res.status(404).json({ error: 'Page not found' });
}

// ESLint ignore required: Express detects error-handling middleware by its 4-parameter signature (err, req, res, next).
// Removing `next` silently breaks error handling — Express would treat this as regular middleware instead.

export function errorHandler(
  err: Error & {
    code?: string;
  },
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  console.error('Error:', err);

  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Record not found' });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'Duplicate value' });
  }

  return res.status(500).json({ error: 'Something went wrong' });
}
