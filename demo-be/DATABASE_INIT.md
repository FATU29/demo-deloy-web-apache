# Database Initialization & Seeding

This document explains how the automatic database migration and seeding works in this project.

## Overview

The backend automatically:
1. **Runs database migrations** on startup to create tables and indexes
2. **Seeds the database with mock data** (optional, configurable)

This ensures that the database is always in the correct state when the application starts.

## How It Works

### Startup Process

When the backend server starts:

```
1. Load environment variables
2. Connect to PostgreSQL database
3. Run migrations (create tables, indexes)
4. Check if seeding is enabled
5. If enabled and database is empty, insert mock data
6. Start Express server
```

### Files

- **`src/utils/db-init.ts`** - Core initialization logic
  - `runMigrations()` - Executes SQL from `database/init.sql`
  - `seedDatabase()` - Inserts mock todo data
  - `initializeDatabase()` - Main function called on startup

- **`database/init.sql`** - SQL schema definition
  - Creates `todos` table
  - Creates indexes for performance
  - Contains sample data (used as fallback)

- **`database/seed.ts`** - Standalone seeding script
  - Can be run manually with `npm run seed`
  - Forces a fresh seed (clears existing data)

## Environment Variables

### `AUTO_SEED`

Controls whether the database is automatically seeded with mock data on startup.

- **Default**: `true` in development, `false` in production
- **Values**: `"true"`, `"1"`, or any truthy value

```bash
# Enable auto-seeding
AUTO_SEED=true

# Disable auto-seeding
AUTO_SEED=false
```

### `FORCE_SEED`

Forces re-seeding even if the database already contains data. **⚠️ Warning: This will delete all existing todos!**

- **Default**: `false`
- **Values**: `"true"` to enable

```bash
# Force re-seed (deletes existing data)
FORCE_SEED=true
```

### `NODE_ENV`

The environment mode affects seeding behavior:

- `development` - Auto-seeding is ON by default
- `production` - Auto-seeding is OFF by default

```bash
NODE_ENV=development  # Seeds automatically
NODE_ENV=production   # Does not seed
```

## Usage Examples

### Development (Docker Compose)

The `docker-compose.yml` is pre-configured for automatic migration and seeding:

```yaml
environment:
  NODE_ENV: development
  AUTO_SEED: "true"
  FORCE_SEED: "false"
```

Start with Docker Compose:

```bash
docker-compose up
```

The database will be:
1. Created automatically
2. Migrated (tables and indexes created)
3. Seeded with 50 mock todos

### Production

For production, disable auto-seeding:

```bash
# .env
NODE_ENV=production
AUTO_SEED=false
```

Or explicitly set it in your deployment:

```bash
docker run -e AUTO_SEED=false -e NODE_ENV=production ...
```

### Manual Seeding

To manually run migrations and seed the database:

```bash
npm run seed
```

This will:
- Run all migrations
- Force seed the database (clear existing data)
- Insert fresh mock data

## Mock Data

The seeding includes **50 diverse todo items** covering:

- ✅ Completed tasks (11 items)
- 📝 Active tasks (39 items)
- Various development activities (documentation, testing, deployment, etc.)
- Feature ideas and improvements

Sample todos include:
- "Complete project documentation"
- "Write unit tests"
- "Deploy to production" (completed)
- "Implement authentication"
- "Add dark mode" (completed)
- ...and many more!

## Behavior Details

### Smart Seeding

The seeding logic is intelligent:

1. **Empty Database**: If no todos exist, seeds automatically (when `AUTO_SEED=true`)
2. **Existing Data**: Skips seeding unless `FORCE_SEED=true`
3. **Idempotent Migrations**: Migrations use `IF NOT EXISTS` clauses, so they're safe to run multiple times

### Console Output

You'll see clear console output during initialization:

```
🔌 Initializing database...
🔄 Running database migrations...
✅ Database migrations completed successfully!
🌱 Starting database seeding...
📝 Inserting mock todos...
✅ Successfully seeded 50 todos!

📊 Database Summary:
   Total: 50
   Completed: 11
   Active: 39

🚀 Server is running on http://localhost:3000
```

If data already exists:

```
🔌 Initializing database...
🔄 Running database migrations...
✅ Database migrations completed successfully!
🌱 Starting database seeding...
ℹ️  Database already contains data. Skipping seed.
   Use FORCE_SEED=true environment variable to force re-seeding.
🚀 Server is running on http://localhost:3000
```

## Troubleshooting

### Database Connection Errors

If migrations fail due to connection issues:

```bash
# Check if PostgreSQL is running
docker-compose ps

# Check logs
docker-compose logs postgres

# Ensure healthcheck passes
docker-compose logs backend
```

### Migration Failures

If migrations fail:

1. Check `database/init.sql` for syntax errors
2. Verify database user has CREATE TABLE permissions
3. Check backend logs for specific errors

### Seeding Issues

If seeding fails:

```bash
# Try manual seeding
npm run seed

# Check database connection
docker-compose exec postgres psql -U postgres -d todo_db -c "SELECT COUNT(*) FROM todos;"
```

### Clear Everything and Start Fresh

To completely reset:

```bash
# Stop and remove containers
docker-compose down

# Remove database volume
docker volume rm demo-deloy-apache_postgres-data

# Start fresh
docker-compose up
```

## Configuration Examples

### Example 1: Fresh Development Start

```yaml
# docker-compose.yml
environment:
  NODE_ENV: development
  AUTO_SEED: "true"
  FORCE_SEED: "false"
```

Result: Clean database with 50 mock todos on first start.

### Example 2: Production Deployment

```yaml
# docker-compose.yml or deployment config
environment:
  NODE_ENV: production
  AUTO_SEED: "false"
```

Result: Empty database, ready for real data. Manual seeding required if needed.

### Example 3: Testing/Demo Environment

```yaml
environment:
  NODE_ENV: development
  AUTO_SEED: "true"
  FORCE_SEED: "true"
```

Result: Always starts with fresh mock data, even if data exists.

## Best Practices

1. **Development**: Keep `AUTO_SEED=true` for convenience
2. **Production**: Set `AUTO_SEED=false` to prevent accidental data loss
3. **CI/CD**: Use `FORCE_SEED=true` for test environments
4. **Manual Control**: Use `npm run seed` for one-time seeding
5. **Backup**: Always backup production data before enabling `FORCE_SEED`

## Migration Safety

The migrations are designed to be safe:

```sql
-- Creates table only if it doesn't exist
CREATE TABLE IF NOT EXISTS todos (...);

-- Creates indexes only if they don't exist
CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);
```

This means you can restart the server without worrying about migration errors.

