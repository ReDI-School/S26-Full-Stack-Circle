# ReDi Events - Backend

This is the backend API for **ReDi Events**. It is a REST API built with Express, TypeScript, and Prisma ORM that connects to a PostgreSQL database.

## What is the tech stack?

| Tool                                          | What it does                                                                             |
| --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [Express](https://expressjs.com/)             | A web framework for handling HTTP requests                                               |
| [TypeScript](https://www.typescriptlang.org/) | JavaScript with types, so you catch errors early                                         |
| [Prisma 7](https://www.prisma.io/)            | An ORM that makes it easy to talk to the database                                        |
| [PostgreSQL](https://www.postgresql.org/)     | A relational database where we store our data                                            |
| [Docker](https://www.docker.com/)             | Runs the database in a container so you don't have to install PostgreSQL on your machine |

## Project structure

```
backend/
├── prisma/
│   ├── schema.prisma     # Defines the database tables (models)
│   └── seed.ts           # Script to add test data to the database
├── prisma.config.ts      # Prisma configuration (database URL, migrations)
├── generated/prisma/     # Auto-generated Prisma client (don't edit this!)
├── src/
│   ├── index.ts          # Entry point - starts the Express server
│   ├── routes/           # Defines the API endpoints (URLs)
│   │   └── userRoutes.ts
│   ├── controllers/      # Handles requests and sends responses
│   │   └── userController.ts
│   ├── services/         # Business logic and database queries
│   │   └── userService.ts
│   └── libs/
│       └── prisma.ts     # Creates and exports the Prisma client
├── .nvmrc                # Node.js version for nvm (v22)
├── package.json
├── tsconfig.json
└── .env                  # Your local environment variables (not in git)
```

## Getting started

### What you need

- **Node.js** version 22 or higher (check with `node -v`)
- **Docker** installed and running

> For detailed installation instructions for Node.js and Docker on your OS, see the [main README](../README.md#prerequisites).

### Step 1: Use the correct Node.js version

```bash
cd backend
nvm use
```

This reads the `.nvmrc` file in this folder and switches to the correct Node.js version (v22). If you see an error saying the version is not installed, run `nvm install` first.

### Step 2: Start the database

From the **project root** (not the backend folder), run:

```bash
docker compose up -d
```

This starts a PostgreSQL database inside a Docker container. You can check it's running with:

```bash
docker compose ps
```

You should see a container with status "Up".

> **What does `docker compose up -d` do?** It reads the `docker-compose.yml` file and starts the services described in it. The `-d` flag means "detached" -- it runs in the background so you can keep using your terminal.

### Step 3: Create your `.env` file

```bash
cp .env.example .env
```

The `.env.example` already has the correct values to connect to the Docker database. You don't need to change anything.

> **Why do this before installing?** The backend uses Prisma, which needs the `.env` file during installation (it runs a `postinstall` script that reads the database URL).

### Step 4: Install dependencies

```bash
npm install
```

### Step 5: Push the database schema

This creates the tables in your database based on the Prisma schema:

```bash
npm run prisma:push
```

### Step 6: (Optional) Add test data

```bash
npm run prisma:seed
```

This creates a test user in the database so you have some data to work with.

### Step 7: Start the server

```bash
npm run dev
```

You should see:

```
Server is running on http://localhost:4000
```

Open `http://localhost:4000` in your browser -- you should see `{"status":"ReDi Events API is running"}`.

## How the code is organized

When a request comes in, it flows through three layers:

```
Request → Route → Controller → Service → Database
                                              ↓
Response ← Route ← Controller ← Service ← Database
```

### Routes (`src/routes/`)

Routes define **which URLs** your API responds to. They connect URLs to controller methods:

```ts
// "When someone visits GET /users, call getAllUsers on the controller"
userRouter.get('/', (req, res) => userController.getAllUsers(req, res));
```

### Controllers (`src/controllers/`)

Controllers handle the **HTTP request and response**. They read data from the request, call the service, and send back a response:

```ts
async getAllUsers(req: Request, res: Response) {
  try {
    const users = await this.userService.getAllUsers();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}
```

### Services (`src/services/`)

Services contain the **business logic** and talk to the database through Prisma:

```ts
async getAllUsers() {
  return await prisma.user.findMany();
}
```

### The Prisma client (`src/libs/prisma.ts`)

This file creates a single Prisma client that the whole app shares:

```ts
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });
```

In Prisma 7, you need a **driver adapter** to connect to the database. The adapter tells Prisma how to talk to PostgreSQL.

## The database schema

The database tables are defined in `prisma/schema.prisma`:

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**What each line means:**

- `id String @id @default(uuid())` -- a unique string ID generated automatically (e.g. `"a1b2c3d4-..."`)

- `email String @unique` -- a text field that must be different for every user
- `name String?` -- an optional text field (the `?` means it can be empty)
- `createdAt DateTime @default(now())` -- automatically set to the current time when created
- `updatedAt DateTime @updatedAt` -- automatically updated every time the record changes

### Changing the schema

When you add or change a model in `schema.prisma`, you need to update the database:

```bash
# Push the changes to the database
npm run prisma:push

# Regenerate the Prisma client so your code knows about the changes
npm run prisma:generate
```

### Browsing the database

Prisma Studio gives you a visual interface to see and edit your data:

```bash
npm run prisma:studio
```

This opens a browser window at `http://localhost:5555`.

## API endpoints

The current API has these endpoints:

| Method | URL          | What it does                          |
| ------ | ------------ | ------------------------------------- |
| GET    | `/`          | Health check (is the server running?) |
| GET    | `/users`     | Get all users                         |
| GET    | `/users/:id` | Get a single user by ID               |
| POST   | `/users`     | Create a new user                     |
| PUT    | `/users/:id` | Update a user                         |
| DELETE | `/users/:id` | Delete a user                         |

### Testing your API with Bruno

To test your API endpoints, we recommend using [Bruno](https://www.usebruno.com/) -- a free, easy-to-use app for sending HTTP requests.

1. Download and install Bruno from [usebruno.com](https://www.usebruno.com/)
2. Open Bruno and create a new request
3. Set the URL to `http://localhost:4000/users` and the method to `GET`
4. Click **Send** -- you should see the list of users as JSON

Bruno lets you visually pick the HTTP method (GET, POST, PUT, DELETE), type in the URL, add a JSON body, and see the response -- no terminal commands needed.

## Available scripts

Run these from the `backend/` folder:

| Command                    | What it does                                       |
| -------------------------- | -------------------------------------------------- |
| `npm run dev`              | Starts the server with auto-reload                 |
| `npm run build`            | Builds the project for production                  |
| `npm start`                | Runs the production build                          |
| `npm run lint`             | Checks your code for problems                      |
| `npm run format`           | Formats your code with Prettier                    |
| `npm run prisma:generate`  | Regenerates the Prisma client                      |
| `npm run prisma:push`      | Pushes schema changes to the database              |
| `npm run prisma:migrate`   | Creates and runs a migration                       |
| `npm run prisma:studio`    | Opens the database browser                         |
| `npm run prisma:seed`      | Adds test data to the database                     |
| `npx tsx src/test-auth.ts` | For testing purposes only to verify JWT endpoints- |

## Adding a new feature (step by step)

When you want to add a new endpoint (for example, events), follow this pattern:

1. **Add the model** to `prisma/schema.prisma` and run `npm run prisma:push`
2. **Create a service** in `src/services/eventService.ts` with the database queries
3. **Create a controller** in `src/controllers/eventController.ts` to handle requests
4. **Create a route** in `src/routes/eventRoutes.ts` to define the URLs
5. **Register the route** in `src/index.ts` with `app.use('/events', eventRouter)`

## Stopping the database

When you're done working, you can stop the Docker container:

```bash
# From the project root
docker compose down
```

To also delete the stored data (start fresh):

```bash
docker compose down -v
```

## Helpful resources

- [Express Documentation](https://expressjs.com/) -- routing, middleware, requests/responses
- [Prisma Documentation](https://www.prisma.io/docs) -- database queries, schema, migrations
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) -- types and interfaces
- [Docker Getting Started](https://docs.docker.com/get-started/) -- containers and compose

# JWT Authentication Setup & Testing

## 🔐 Set Up JWT Secret

### 1. Create `.env` file in `backend` folder

```bash
touch .env
```

### 2. Add your secret to .env:

```
JWT_SECRET=your-super-secret-key-minimum-32-characters
```

### 3. Run the Tests

Start the test server:

```bash
npx tsx src/test-auth.ts
```

Expected output:

```bash
✅ Server running on http://localhost:4000
   GET /public
   GET /protected (use token above)
   GET /get-expired-token
   GET /test-expired
```

### 4. Test with Postman

| Endpoint                                | Method |                Headers                | Expected Result   |
| :------------------------------------------ | :----: | :--------------------: | :---------------------- |
| http://localhost:4000/public            |  GET   |                 None                  | 200 OK            |
| http://localhost:4000/protected         |  GET   |     Authorization: Bearer <token>     | 200 OK            |
| http://localhost:4000/protected         |  GET   |                 None                  | 401 Unauthorized  |
| http://localhost:4000/get-expired-token |  GET   |                 None                  | 200 OK            |
| http://localhost:4000/test-expired      |  GET   | Authorization: Bearer <expired_token> | 401 Token expired |
