# Todo List Backend API

A RESTful API for managing todos built with Express, TypeScript, and PostgreSQL.

## Features

- ✅ Full CRUD operations for todos
- ✅ PostgreSQL database with connection pooling
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

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_db
DB_USER=postgres
DB_PASSWORD=your_password
```

### 3. Initialize Database

Run the SQL script to create the database and table:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE todo_db;

# Exit and run the init script
psql -U postgres -d todo_db -f database/init.sql
```

Or manually run the SQL commands from `database/init.sql`

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
│   │   └── database.ts       # Database connection
│   ├── controllers/
│   │   └── todo.controller.ts # Business logic
│   ├── models/
│   │   └── todo.model.ts      # TypeScript interfaces
│   ├── routes/
│   │   └── todo.routes.ts     # API routes
│   └── server.ts              # Express app setup
├── database/
│   └── init.sql               # Database schema
├── .env.example               # Environment variables template
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

