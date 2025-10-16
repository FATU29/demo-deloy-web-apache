# Quick Start Guide

Get the Todo App running in under 5 minutes!

## Option 1: Docker Compose (Recommended)

The fastest way to get started:

```bash
# Start all services (database, backend, frontend)
docker-compose up

# Access the app
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000
```

That's it! The database will be automatically initialized with sample data.

To stop:
```bash
docker-compose down
```

## Option 2: Manual Setup

### Prerequisites
- Node.js v18+
- PostgreSQL v12+
- npm

### 1. Run Setup Script

```bash
./setup.sh
```

### 2. Configure Environment

Edit `demo-be/.env` with your PostgreSQL credentials:
```env
DB_PASSWORD=your_actual_password
```

### 3. Setup Database

```bash
# Create database
psql -U postgres -c "CREATE DATABASE todo_db;"

# Initialize schema
psql -U postgres -d todo_db -f demo-be/database/init.sql
```

### 4. Start Backend

```bash
cd demo-be
npm run dev
```

Backend runs on http://localhost:3000

### 5. Start Frontend (in new terminal)

```bash
cd demo-fe
npm run dev
```

Frontend runs on http://localhost:5173

## Verify Installation

1. Open http://localhost:5173 in your browser
2. You should see the Todo App with sample todos
3. Try creating, editing, and deleting todos

## Common Issues

### Backend won't start
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify database credentials in `demo-be/.env`

### Frontend can't connect to backend
- Ensure backend is running on port 3000
- Check `VITE_API_URL` in `demo-fe/.env`

### Database connection error
- Make sure PostgreSQL is installed and running
- Verify the database exists: `psql -U postgres -l | grep todo_db`

## What's Next?

- Check out the [main README](README.md) for detailed documentation
- Read about [deployment](README.md#-apache-deployment)
- Explore the [API endpoints](README.md#-api-endpoints)

## Quick Commands

```bash
# Backend
cd demo-be
npm run dev      # Development
npm run build    # Build for production
npm start        # Run production build

# Frontend
cd demo-fe
npm run dev      # Development
npm run build    # Build for production
npm run preview  # Preview production build

# Docker
docker-compose up              # Start all services
docker-compose down            # Stop all services
docker-compose logs -f         # View logs
docker-compose restart         # Restart services
```

## Demo Credentials (Docker)

When using Docker Compose:
- **PostgreSQL:**
  - Host: localhost:5432
  - Database: todo_db
  - User: postgres
  - Password: postgres

## Need Help?

1. Check the [Troubleshooting](README.md#-troubleshooting) section
2. Review the console logs for errors
3. Ensure all prerequisites are installed

Happy coding! 🎉

