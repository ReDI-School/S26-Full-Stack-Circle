import { NextFunction, Request, Response } from 'express';

export function notFound(req: Request, res: Response) {
  res.status(404).json({ error: 'Page not found' });
}

// ESLint ignore required: Express detects error-handling middleware by its 4-parameter signature (err, req, res, next).
// Removing `next` silently breaks error handling — Express would treat this as regular middleware instead.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong' });
}
