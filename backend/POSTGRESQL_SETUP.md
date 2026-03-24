# Local PostgreSQL Setup Guide

This guide will help you set up PostgreSQL locally on your machine for the ReDi FSC project.

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- PostgreSQL installed on your system (see below for installation options)

## Option 1: Local PostgreSQL Installation

### macOS (using Homebrew)

```bash
# Install PostgreSQL
brew install postgresql

# Start PostgreSQL service
brew services start postgresql

# Create a database user (optional)
createuser -s postgres

# Create the database
createdb redi_fsc_dev
```

### Ubuntu/Debian

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Switch to postgres user and create database
sudo -u postgres psql
CREATE DATABASE redi_fsc_dev;
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE redi_fsc_dev TO your_username;
\q
```

### Windows

1. Download PostgreSQL from [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Run the installer and follow the setup wizard
3. Remember the password you set for the `postgres` user
4. Use pgAdmin (comes with the installer) to create a database named `redi_fsc_dev`

## Option 2: Local PostgreSQL Installation (Recommended)

### macOS (using Homebrew) - Alternative Method

If you prefer a different approach or encounter issues with the previous method:

```bash
# Install PostgreSQL using Homebrew
brew install postgresql@15

# Add PostgreSQL to your PATH (add to ~/.zshrc or ~/.bash_profile)
echo 'export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Start PostgreSQL service
brew services start postgresql@15

# Create database and user
createdb redi_fsc_dev
createuser -s postgres
psql -d redi_fsc_dev -c "ALTER USER postgres WITH PASSWORD 'password';"
```

### Windows - Alternative Method

If you prefer using Chocolatey:

```bash
# Install Chocolatey first if you don't have it
# Then install PostgreSQL
choco install postgresql15

# The service should start automatically
# Use pgAdmin to create database 'redi_fsc_dev'
# Or use command line:
psql -U postgres -c "CREATE DATABASE redi_fsc_dev;"
```

## Option 3: Cloud PostgreSQL (Production)

### Supabase (Free tier available)

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Get your database connection string from Settings > Database
4. Use the connection string format: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`

### Railway

1. Go to [https://railway.app](https://railway.app)
2. Create a new project
3. Add a PostgreSQL service
4. Get your connection string from the service variables

## Verification

### Test Local PostgreSQL Installation

Before proceeding with configuration, verify your PostgreSQL installation:

```bash
# Check if PostgreSQL is running
psql --version

# Test connection to PostgreSQL
psql -U postgres -d redi_fsc_dev

# You should see the PostgreSQL prompt: redi_fsc_dev=#
# Type \q to exit
```

If you encounter connection issues:

- Make sure PostgreSQL service is running
- Check if the default user 'postgres' exists
- Verify the database 'redi_fsc_dev' was created

## Configuration

### 1. Create Environment File

Copy the example environment file:

```bash
cp env.example .env
```

### 2. Update Database URL

Edit your `.env` file and update the `DATABASE_URL`:

**Local PostgreSQL:**

```ts
DATABASE_URL = 'postgresql://postgres:password@localhost:5432/redi_fsc_dev';
```

**Cloud (example with Supabase):**

```ts
DATABASE_URL = 'postgresql://postgres:your_password@db.your_project_ref.supabase.co:5432/postgres';
```

### 3. Initialize Database

```bash
# Generate Prisma client
npm run prisma:generate

# Push the schema to the database
npm run prisma:push

# Or create and run migrations
npm run prisma:migrate
```

## Verification

### Test Connection

```bash
# Start the development server
npm run dev
```

If everything is set up correctly, you should see:

- No database connection errors
- The server starting successfully
- Prisma client generated without errors

### Check Database

You can use Prisma Studio to view your database:

```bash
npm run prisma:studio
```

This will open a web interface at `http://localhost:5555` where you can browse your database.

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Make sure PostgreSQL is running
   - Check if the port (5432) is correct
   - Verify firewall settings

2. **Authentication Failed**
   - Check username and password
   - Ensure the user has access to the database
   - For local installations, try using `postgres` as both username and password

3. **Database Does Not Exist**
   - Create the database manually
   - Check if the database name in your connection string matches

4. **Permission Denied**
   - Ensure the user has proper privileges
   - For local installations, you might need to run as the postgres user

### Reset Database

If you need to start fresh:

```bash
# Drop all tables and recreate
npm run prisma:push --force-reset

# Or reset and run migrations
npm run prisma:migrate:reset
```

## Next Steps

Once your PostgreSQL database is set up and connected:

1. Your Prisma schema is already configured for PostgreSQL
2. Run `npm run prisma:push` to create your tables
3. Start developing with `npm run dev`
4. Use Prisma Studio to manage your data during development

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker PostgreSQL](https://hub.docker.com/_/postgres)
