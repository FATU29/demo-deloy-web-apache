# Database Migration & Seeding Update

## Summary

The backend now **automatically migrates and seeds the database** when it starts! 🎉

## What Changed

### 1. New Auto-Migration System ✅

- Database tables and indexes are created automatically on server startup
- No more manual `psql` commands needed
- Safe to run multiple times (idempotent)

### 2. Auto-Seeding with Mock Data ✅

- Optionally seeds database with **50 diverse mock todos**
- Configurable via environment variables
- Smart: Only seeds if database is empty (unless forced)

### 3. New Files Created

```
demo-be/
├── src/utils/db-init.ts           # Auto-migration & seeding logic
├── DATABASE_INIT.md                # Comprehensive documentation
└── (updated) database/seed.ts     # Simplified manual seed script
```

### 4. Updated Files

- **`demo-be/src/server.ts`** - Now calls `initializeDatabase()` on startup
- **`docker-compose.yml`** - Added `AUTO_SEED` and `FORCE_SEED` env vars
- **`demo-be/README.md`** - Updated setup instructions

## Quick Start

### Using Docker Compose (Recommended)

```bash
docker-compose up
```

That's it! The database will automatically:
1. Create tables ✅
2. Create indexes ✅
3. Insert 50 mock todos ✅

### Manual Development Setup

```bash
# 1. Create database
psql -U postgres -c "CREATE DATABASE todo_db;"

# 2. Start backend (auto-migrates and seeds)
cd demo-be
npm run dev
```

## Environment Variables

### `AUTO_SEED` (default: `true` in development)

Controls automatic seeding on startup:

```bash
AUTO_SEED=true   # Seeds if database is empty
AUTO_SEED=false  # Never seeds automatically
```

### `FORCE_SEED` (default: `false`)

Forces re-seeding even if data exists. ⚠️ **Deletes all todos!**

```bash
FORCE_SEED=true  # Clears and re-seeds on every startup
```

### In Docker Compose

Already configured in `docker-compose.yml`:

```yaml
environment:
  AUTO_SEED: "true"
  FORCE_SEED: "false"
```

## Usage Examples

### Development: Fresh Start with Mock Data

```bash
docker-compose up
# ✅ Tables created
# ✅ 50 todos inserted
# 🚀 Ready to develop!
```

### Production: No Auto-Seeding

```bash
docker run -e NODE_ENV=production -e AUTO_SEED=false ...
# ✅ Tables created
# ⏭️  Seeding skipped
# 🚀 Ready for real data!
```

### Testing: Force Fresh Data Every Time

```bash
docker-compose up -e FORCE_SEED=true
# ✅ Tables created
# 🗑️  Existing todos cleared
# ✅ Fresh 50 todos inserted
# 🚀 Ready for testing!
```

### Manual Seed Command

```bash
cd demo-be
npm run seed
# Runs migrations and force-seeds the database
```

## Mock Data Included

The auto-seeding includes **50 diverse todos**:

- ✅ 11 completed tasks
- 📝 39 active tasks
- Topics: documentation, testing, deployment, features, etc.

Examples:
- "Complete project documentation" (active)
- "Deploy to production" (completed)
- "Implement authentication" (active)
- "Add dark mode" (completed)
- "Setup CI/CD pipeline" (completed)
- ...and 45 more!

## Console Output

When starting, you'll see clear feedback:

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

## Benefits

### For Development

- ✅ **Faster setup** - No manual SQL commands
- ✅ **Consistent state** - Everyone has the same data
- ✅ **Visual testing** - Rich mock data for UI development
- ✅ **Zero configuration** - Works out of the box

### For Production

- ✅ **Safe** - Auto-seeding disabled by default
- ✅ **Idempotent** - Safe to restart multiple times
- ✅ **Automated** - Migrations run automatically
- ✅ **Flexible** - Full control via environment variables

### For Testing

- ✅ **Repeatable** - Force fresh data every run
- ✅ **Realistic** - 50 diverse test cases
- ✅ **Fast** - No manual setup needed

## Migration Safety

The migrations are designed to be safe:

```sql
CREATE TABLE IF NOT EXISTS todos (...);
CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);
```

You can restart the server as many times as you want without errors!

## Documentation

For detailed information, see:

- **[DATABASE_INIT.md](./demo-be/DATABASE_INIT.md)** - Complete guide
- **[README.md](./demo-be/README.md)** - Updated setup instructions

## Backward Compatibility

✅ All existing functionality preserved
✅ Old manual setup still works (just not required)
✅ Environment variables are optional

## Testing

Try it out:

```bash
# 1. Start fresh
docker-compose down -v
docker-compose up

# 2. Check logs for migration/seeding output

# 3. Visit frontend and see 50 todos

# 4. Restart backend
docker-compose restart backend

# 5. Notice: Migrations run again (safe), but seeding is skipped
```

## Troubleshooting

### Problem: Seeding doesn't happen

**Solution:** Check environment variables:
```bash
docker-compose exec backend env | grep SEED
# Should show: AUTO_SEED=true
```

### Problem: Want to reset data

**Solution:** 
```bash
# Option 1: Use FORCE_SEED
docker-compose down
docker-compose up -e FORCE_SEED=true

# Option 2: Clear volume
docker-compose down -v
docker-compose up
```

### Problem: Migration errors

**Solution:** Check PostgreSQL is healthy:
```bash
docker-compose ps
docker-compose logs postgres
```

## What's Next?

The system is ready! Just:

1. Start with `docker-compose up`
2. Develop your features
3. Mock data is already there
4. Deploy with `AUTO_SEED=false`

Enjoy your automated database setup! 🚀

