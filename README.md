# ReDi Events - Full Stack Project

Welcome to the **ReDi Events** project! This is a full-stack web application where users can create, join, and manage events.

The project has two parts:

- **Frontend** -- a Next.js + React app (what users see in the browser)
- **Backend** -- an Express + Prisma API (handles data and talks to the database)
- **Database** -- a PostgreSQL database running in Docker

## Prerequisites

Before you begin, make sure you have these two things installed:

### 1. Node.js (version 22 or higher)

Check if you already have it by running `node -v` in your terminal.

If you need to install it, we recommend using **nvm** (Node Version Manager):

**macOS / Linux:**

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Close and reopen your terminal, then run:
nvm install 22
nvm use 22
```

**Windows:**

Download and install [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) (click on `nvm-setup.exe` in the latest release). Then open a **new** terminal and run:

```bash
nvm install 22
nvm use 22
```

### 2. Docker (to run the database)

We use Docker to run the PostgreSQL database. This way you don't have to install PostgreSQL directly on your machine.

<details>
<summary><strong>macOS (using Colima -- recommended)</strong></summary>

[Colima](https://github.com/abiosoft/colima) is a lightweight way to run Docker on macOS. It is free and works well.

**Step 1: Install Homebrew** (if you don't have it already)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Step 2: Install Docker and Colima**

```bash
brew install docker docker-compose colima
```

**Step 3: Start Colima**

```bash
colima start
```

You need to run `colima start` once every time you restart your computer. After that, all `docker` commands will work normally.

> **Tip:** If you want Colima to start automatically when you log in, run: `brew services start colima`

To verify it's working:

```bash
docker ps
```

You should see an empty table (no error). That means Docker is ready.

</details>

<details>
<summary><strong>Windows (using Docker Desktop)</strong></summary>

**Step 1: Enable WSL 2**

Open **PowerShell as Administrator** and run:

```powershell
wsl --install
```

Restart your computer when prompted.

**Step 2: Install Docker Desktop**

1. Download [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
2. Run the installer
3. Make sure "Use WSL 2 instead of Hyper-V" is checked during installation
4. Restart your computer if asked

**Step 3: Start Docker Desktop**

Open Docker Desktop from the Start menu. Wait until the whale icon in the taskbar shows "Docker Desktop is running".

To verify it's working, open a terminal and run:

```bash
docker ps
```

You should see an empty table (no error). That means Docker is ready.

</details>

<details>
<summary><strong>Linux (Ubuntu / Debian)</strong></summary>

**Step 1: Install Docker**

```bash
# Update packages
sudo apt update

# Install Docker
sudo apt install -y docker.io docker-compose-v2

# Add your user to the docker group (so you don't need sudo every time)
sudo usermod -aG docker $USER
```

**Step 2: Log out and log back in** (this is needed for the group change to take effect).

**Step 3: Start Docker**

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

To verify it's working:

```bash
docker ps
```

You should see an empty table (no error). That means Docker is ready.

</details>

## Quick start

### 0. Use the correct Node.js version

This project includes a `.nvmrc` file that specifies which Node.js version to use. Run this from the project root:

```bash
nvm use
```

This reads the `.nvmrc` file and switches to the correct version (v22). If you see an error saying the version is not installed, run `nvm install` first.

> **What is `.nvmrc`?** It's a small file that just contains a Node.js version number (like `v22`). When you run `nvm use` in a folder that has this file, nvm automatically switches to that version. This way everyone on the team uses the same version.

### 1. Start the database

```bash
npm run db:up
```

This starts a PostgreSQL database inside a Docker container. You only need to do this once per coding session.

> **How do I know it's working?** Run `docker compose ps` -- you should see a container with status "Up".

### 2. Install all dependencies

```bash
npm run install:all
```

### 3. Set up the backend environment

```bash
cd backend
cp .env.example .env
npm run prisma:push
cd ..
```

This creates your `.env` file (with the database connection) and sets up the database tables.

### 4. Start both servers

Open **two separate terminal windows**:

```bash
# Terminal 1 - Backend (http://localhost:4000)
npm run start:backend
```

```bash
# Terminal 2 - Frontend (http://localhost:3000)
npm run start:frontend
```

Open `http://localhost:3000` in your browser to see the app.

### When you're done

Stop the database container:

```bash
npm run db:down
```

## Project structure

```
S26-Full-Stack-Circle/
├── frontend/              # Next.js + React application
├── backend/               # Express + Prisma REST API
├── docker-compose.yml     # PostgreSQL database container
├── .nvmrc                 # Node.js version for nvm (v22)
└── package.json           # Root scripts (install, start, db)
```

## Available scripts (from project root)

| Command | What it does |
|---------|-------------|
| `npm run db:up` | Start the PostgreSQL database |
| `npm run db:down` | Stop the PostgreSQL database |
| `npm run install:all` | Install dependencies for both frontend and backend |
| `npm run start:backend` | Start the backend server |
| `npm run start:frontend` | Start the frontend server |

## More details

- [Frontend README](./frontend/README.md) -- how the React app works
- [Backend README](./backend/README.md) -- how the API and database work
