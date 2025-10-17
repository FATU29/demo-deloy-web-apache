# Database Auto-Initialization Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Server Startup                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Load .env vars │
                    │  - AUTO_SEED    │
                    │  - FORCE_SEED   │
                    │  - NODE_ENV     │
                    └────────┬────────┘
                             │
                             ▼
            ┌────────────────────────────────┐
            │  initializeDatabase()          │
            │  (src/utils/db-init.ts)        │
            └────────┬───────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │    runMigrations()         │
        │                            │
        │  1. Read init.sql          │
        │  2. Parse SQL statements   │
        │  3. Execute each statement │
        │     - CREATE TABLE         │
        │     - CREATE INDEX         │
        │                            │
        │  Result: Tables & Indexes  │
        └────────┬───────────────────┘
                 │
                 ▼
        ┌────────────────────────────┐
        │  Check AUTO_SEED           │
        └────────┬───────────────────┘
                 │
        ┌────────┴─────────┐
        │                  │
        ▼                  ▼
    AUTO_SEED=true    AUTO_SEED=false
        │                  │
        │                  └──────────┐
        ▼                             │
┌───────────────────┐                 │
│ isDatabaseEmpty() │                 │
└────────┬──────────┘                 │
         │                            │
    ┌────┴────┐                       │
    │         │                       │
    ▼         ▼                       │
  Empty    Has Data                   │
    │         │                       │
    │         ▼                       │
    │    ┌─────────────┐              │
    │    │ FORCE_SEED? │              │
    │    └─────┬───────┘              │
    │          │                      │
    │     ┌────┴────┐                 │
    │     │         │                 │
    │     ▼         ▼                 │
    │   true      false               │
    │     │         │                 │
    │     │         └──────┐          │
    │     ▼                │          │
    │ ┌──────────┐         │          │
    └►│ SEED DB  │         │          │
      │          │         │          │
      │ 1. Clear existing  │          │
      │    (if FORCE)      │          │
      │ 2. Insert 50 todos │          │
      │ 3. Show stats      │          │
      └──────┬───┘         │          │
             │             │          │
             └─────┬───────┘          │
                   │                  │
                   ▼                  │
              ┌─────────┐             │
              │  SKIP   │◄────────────┘
              │ SEEDING │
              └────┬────┘
                   │
                   ▼
        ┌────────────────────┐
        │  Start Express App │
        │  app.listen(PORT)  │
        └────────┬───────────┘
                 │
                 ▼
        ┌─────────────────────┐
        │   Server Running    │
        │   Ready for API     │
        │   calls!            │
        └─────────────────────┘
```

## Decision Tree

```
┌─────────────────────────────────────────────────────────────┐
│ Should we seed the database?                                │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │ Is AUTO_SEED=true?    │
            └───────┬───────────────┘
                    │
        ┌───────────┴────────────┐
        │                        │
        ▼ NO                     ▼ YES
    ┌───────┐          ┌──────────────────┐
    │ SKIP  │          │ Check database   │
    └───────┘          └────────┬─────────┘
                                │
                    ┌───────────┴────────────┐
                    │                        │
                    ▼                        ▼
            ┌──────────────┐        ┌─────────────────┐
            │ DB is empty  │        │ DB has data     │
            └──────┬───────┘        └────────┬────────┘
                   │                         │
                   ▼                         ▼
              ┌────────┐         ┌───────────────────┐
              │ SEED!  │         │ Is FORCE_SEED=on? │
              └────────┘         └────────┬──────────┘
                                          │
                              ┌───────────┴────────────┐
                              │                        │
                              ▼ YES                    ▼ NO
                        ┌──────────┐             ┌────────┐
                        │ SEED!    │             │ SKIP   │
                        │ (clear   │             │        │
                        │  first)  │             │        │
                        └──────────┘             └────────┘
```

## Environment Variable Impact

| NODE_ENV | AUTO_SEED | FORCE_SEED | DB Empty | DB Has Data | Result |
|----------|-----------|------------|----------|-------------|--------|
| development | (default) | false | ✅ | ❌ | **Seed** |
| development | (default) | false | ❌ | ✅ | **Skip** |
| development | true | false | ✅ | ❌ | **Seed** |
| development | true | false | ❌ | ✅ | **Skip** |
| development | true | true | ❌ | ✅ | **Force Seed** 🗑️ |
| development | false | - | - | - | **Skip** |
| production | (default) | false | - | - | **Skip** |
| production | true | false | ✅ | ❌ | **Seed** |

## File Dependencies

```
server.ts
    │
    └──► imports initializeDatabase()
              │
              └──► from src/utils/db-init.ts
                        │
                        ├──► imports pool (from config/database.ts)
                        ├──► reads database/init.sql
                        └──► exports:
                              - runMigrations()
                              - isDatabaseEmpty()
                              - seedDatabase()
                              - initializeDatabase()
```

## Data Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    Migration Phase                           │
└─────────────────────┬────────────────────────────────────────┘
                      │
                      ▼
        ┌──────────────────────────┐
        │  database/init.sql       │
        │                          │
        │  • CREATE TABLE todos    │
        │  • CREATE INDEX ...      │
        └──────────┬───────────────┘
                   │
                   │ (read by)
                   │
                   ▼
        ┌──────────────────────────┐
        │  runMigrations()         │
        │                          │
        │  Parses and executes     │
        └──────────┬───────────────┘
                   │
                   │ (executes)
                   │
                   ▼
        ┌──────────────────────────┐
        │  PostgreSQL Database     │
        │                          │
        │  ✓ todos table           │
        │  ✓ indexes               │
        └──────────┬───────────────┘
                   │
┌──────────────────┴────────────────────────────────────────────┐
│                    Seeding Phase (Optional)                   │
└─────────────────────┬─────────────────────────────────────────┘
                      │
                      ▼
        ┌──────────────────────────┐
        │  mockTodos[] (in memory) │
        │                          │
        │  50 todo objects         │
        └──────────┬───────────────┘
                   │
                   │ (processed by)
                   │
                   ▼
        ┌──────────────────────────┐
        │  seedDatabase()          │
        │                          │
        │  Inserts via SQL         │
        └──────────┬───────────────┘
                   │
                   │ (INSERTs)
                   │
                   ▼
        ┌──────────────────────────┐
        │  PostgreSQL Database     │
        │                          │
        │  ✓ 50 todos              │
        │    - 11 completed        │
        │    - 39 active           │
        └──────────────────────────┘
```

## Console Output Timeline

```
Time  │ Output
──────┼────────────────────────────────────────────────────────
0ms   │ 🔌 Initializing database...
      │
50ms  │ 🔄 Running database migrations...
      │
200ms │ ✅ Database migrations completed successfully!
      │
250ms │ 🌱 Starting database seeding...
      │
300ms │ 📝 Inserting mock todos...
      │
1500ms│ ✅ Successfully seeded 50 todos!
      │
1550ms│ 📊 Database Summary:
      │    Total: 50
      │    Completed: 11
      │    Active: 39
      │
1600ms│ 🚀 Server is running on http://localhost:3000
      │
      │ ✓ Ready for API requests!
```

## Function Call Hierarchy

```
startServer()
    │
    └─► initializeDatabase()
            │
            ├─► runMigrations()
            │       │
            │       ├─► fs.readFileSync('database/init.sql')
            │       │
            │       └─► pool.query(statement) × N statements
            │
            └─► seedDatabase(force)
                    │
                    ├─► isDatabaseEmpty()
                    │       │
                    │       └─► pool.query('SELECT COUNT(*) ...')
                    │
                    ├─► pool.query('DELETE FROM todos') [if force]
                    │
                    └─► pool.query('INSERT INTO todos ...') × 50
```

## Error Handling Flow

```
try {
    runMigrations()
} catch (error) {
    ┌─────────────────────────────┐
    │ ❌ Error running migrations │
    │    Log error                │
    │    Throw error              │
    └──────────────┬──────────────┘
                   │
                   ▼
         ┌──────────────────┐
         │ Server exits     │
         │ process.exit(1)  │
         └──────────────────┘
}

try {
    seedDatabase()
} catch (error) {
    ┌─────────────────────────────┐
    │ ❌ Error seeding database   │
    │    Log error                │
    │    Throw error              │
    └──────────────┬──────────────┘
                   │
                   ▼
         ┌──────────────────┐
         │ Server exits     │
         │ process.exit(1)  │
         └──────────────────┘
}
```

## Idempotency Guarantee

```
Run 1:
    runMigrations()
        └─► CREATE TABLE IF NOT EXISTS todos
        └─► CREATE INDEX IF NOT EXISTS idx_todos_completed
    Result: ✓ Tables created

Run 2:
    runMigrations()
        └─► CREATE TABLE IF NOT EXISTS todos (skipped - exists)
        └─► CREATE INDEX IF NOT EXISTS idx_todos_completed (skipped - exists)
    Result: ✓ No errors, safe

Run 3:
    runMigrations()
        └─► CREATE TABLE IF NOT EXISTS todos (skipped - exists)
        └─► CREATE INDEX IF NOT EXISTS idx_todos_completed (skipped - exists)
    Result: ✓ No errors, safe

Conclusion: Can run migrations unlimited times safely! 🔒
```

## Quick Reference

### Enable Auto-Seed
```bash
AUTO_SEED=true npm run dev
```

### Disable Auto-Seed
```bash
AUTO_SEED=false npm run dev
```

### Force Re-Seed
```bash
FORCE_SEED=true npm run dev
```

### Production Mode
```bash
NODE_ENV=production npm start
# AUTO_SEED defaults to false
```

### Development Mode
```bash
NODE_ENV=development npm run dev
# AUTO_SEED defaults to true
```

---

**Note:** This flow runs **every time** the backend server starts, ensuring the database is always in the correct state!

