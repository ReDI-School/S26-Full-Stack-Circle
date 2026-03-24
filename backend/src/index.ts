import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import userRouter from './routes/userRoutes';

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const origins = process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()) || [];
      const hostname = new URL(origin).hostname;
      const allowed = origins.some((allowedOrigin) => hostname.endsWith(allowedOrigin));

      if (allowed) {
        callback(null, true);
      } else if (process.env.NODE_ENV !== 'production') {
        // in dev, allow everything
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
);

// Routes
app.use('/users', userRouter);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'Rediflix API is running' });
});

const protocol = process.env.PROTOCOL ?? 'http';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ?? 4000;

const server = app.listen(Number(port), () => {
  console.log(`⚡️ Server is running on ${protocol}://${host}:${port}`);
  console.log(`🔄 Endpoint: ${protocol}://${host}:${port}`);
});

server.on('error', (error) => {
  console.error(
    '❌ Failed to start server:',
    error instanceof Error ? error.message : 'Unknown error'
  );
  process.exit(1);
});

export default app;
