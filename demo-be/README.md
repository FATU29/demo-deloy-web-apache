# Todo List Backend API

A RESTful API for managing todos built with Express, TypeScript, and PostgreSQL.

## Features

- ✅ Full CRUD operations for todos
- ✅ PostgreSQL database with connection pooling
- ✅ **Automatic database migrations on startup**
- ✅ **Optional auto-seeding with 50 mock todos**
- ✅ TypeScript for type safety
- ✅ CORS enabled
- ✅ RESTful API design
- ✅ Error handling

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Create a `.env` file in the root directory (optional - uses defaults):

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_db
DB_USER=postgres
DB_PASSWORD=your_password
AUTO_SEED=true        # Auto-seed with mock data
FORCE_SEED=false      # Force re-seed (deletes existing data)
```

### 3. Create Database

Create the PostgreSQL database (migrations will create tables automatically):

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE todo_db;

# Exit
\q
```

**Note:** The application will automatically:
- ✅ Create tables and indexes on startup
- ✅ Seed with 50 mock todos (if `AUTO_SEED=true`)

### 4. Start the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

On startup, you'll see:
```
🔌 Initializing database...
🔄 Running database migrations...
✅ Database migrations completed successfully!
🌱 Starting database seeding...
✅ Successfully seeded 50 todos!
🚀 Server is running on http://localhost:3000
```

### 5. Manual Database Operations

**Seed database manually:**
```bash
npm run seed
```

**Reset and re-seed:**
```bash
# Set in .env or export
export FORCE_SEED=true
npm run dev
```

For more details, see [DATABASE_INIT.md](./DATABASE_INIT.md)

## API Endpoints

### Health Check
- `GET /` - Check API status

### Todos
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status
- `DELETE /api/todos/:id` - Delete a todo

### Request Examples

**Create Todo:**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "New Todo", "description": "Todo description"}'
```

**Get All Todos:**
```bash
curl http://localhost:3000/api/todos
```

**Update Todo:**
```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Todo", "completed": true}'
```

**Toggle Todo:**
```bash
curl -X PATCH http://localhost:3000/api/todos/1/toggle
```

**Delete Todo:**
```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

## Project Structure

```
demo-be/
├── src/
│   ├── config/
│   │   └── database.ts        # Database connection
│   ├── controllers/
│   │   └── todo.controller.ts # Business logic
│   ├── models/
│   │   └── todo.model.ts      # TypeScript interfaces
│   ├── routes/
│   │   └── todo.routes.ts     # API routes
│   ├── utils/
│   │   └── db-init.ts         # 🆕 Auto-migration & seeding
│   └── server.ts              # Express app setup
├── database/
│   ├── init.sql               # Database schema
│   └── seed.ts                # Manual seeding script
├── DATABASE_INIT.md           # 🆕 Migration & seeding docs
├── package.json
└── tsconfig.json
```

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

## License

MIT

