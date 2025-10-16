# Environment Variables Guide

Complete guide for configuring environment variables for the Todo List application.

## 📋 Overview

The application uses environment variables to configure both the backend and frontend. This allows you to easily switch between development, staging, and production environments.

## 🔧 Backend Environment Variables

### Location
`demo-be/.env`

### Required Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `PORT` | Port number for the Express server | `3000` | `3000`, `8080`, `5000` |
| `DB_HOST` | PostgreSQL server hostname | `localhost` | `localhost`, `db.example.com` |
| `DB_PORT` | PostgreSQL server port | `5432` | `5432` |
| `DB_NAME` | Database name | `todo_db` | `todo_db`, `todo_production` |
| `DB_USER` | Database username | `postgres` | `postgres`, `admin` |
| `DB_PASSWORD` | Database password | `postgres` | `your_secure_password` |

### Setup

1. **Copy the example file:**
   ```bash
   cd demo-be
   cp .env.example .env
   ```

2. **Edit the `.env` file:**
   ```bash
   nano .env
   # or
   code .env
   ```

3. **Update with your values:**
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=todo_db
   DB_USER=postgres
   DB_PASSWORD=your_actual_password
   ```

### Environment Examples

#### Development
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_db
DB_USER=postgres
DB_PASSWORD=postgres
```

#### Production
```env
PORT=3000
DB_HOST=production-db.example.com
DB_PORT=5432
DB_NAME=todo_db_production
DB_USER=todo_app_user
DB_PASSWORD=very_secure_random_password_123
```

#### Docker
```env
PORT=3000
DB_HOST=postgres
DB_PORT=5432
DB_NAME=todo_db
DB_USER=postgres
DB_PASSWORD=postgres
```

## 🎨 Frontend Environment Variables

### Location
`demo-fe/.env`

### Required Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000/api` | See examples below |

### Setup

1. **Copy the example file:**
   ```bash
   cd demo-fe
   cp .env.example .env
   ```

2. **Edit the `.env` file:**
   ```bash
   nano .env
   # or
   code .env
   ```

3. **Update with your backend URL:**
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

### Environment Examples

#### Development (Local Backend)
```env
VITE_API_URL=http://localhost:3000/api
```

#### Development (Remote Backend)
```env
VITE_API_URL=http://192.168.1.100:3000/api
```

#### Staging
```env
VITE_API_URL=https://api-staging.yourdomain.com/api
```

#### Production
```env
VITE_API_URL=https://api.yourdomain.com/api
```

#### Docker Development
```env
VITE_API_URL=http://localhost:3000/api
```

## 🔐 Security Best Practices

### DO ✅

1. **Never commit `.env` files to Git**
   - They contain sensitive credentials
   - Always use `.env.example` instead

2. **Use strong passwords in production**
   - Minimum 16 characters
   - Mix of letters, numbers, and symbols
   - Use a password manager

3. **Different credentials per environment**
   - Development: Simple credentials
   - Production: Strong, unique credentials

4. **Keep `.env` files secure**
   ```bash
   chmod 600 .env
   ```

5. **Use environment-specific values**
   - Different database names
   - Different users
   - Different passwords

### DON'T ❌

1. **Never use default passwords in production**
   - `postgres`, `admin`, `password123`

2. **Never commit `.env` to version control**
   - Add to `.gitignore` (already done)

3. **Never share `.env` files**
   - Use secure methods for team sharing
   - Consider using secret management tools

4. **Never hardcode secrets in code**
   - Always use environment variables

## 🚀 Quick Setup Commands

### Complete Setup (Both Frontend & Backend)

```bash
# Backend
cd demo-be
cp .env.example .env
nano .env  # Edit with your values

# Frontend
cd ../demo-fe
cp .env.example .env
nano .env  # Usually no changes needed for development
```

### Verify Configuration

```bash
# Check backend .env exists and has content
cat demo-be/.env

# Check frontend .env exists and has content
cat demo-fe/.env
```

## 🐳 Docker Environment Variables

When using Docker Compose, environment variables are set in `docker-compose.yml`:

```yaml
services:
  backend:
    environment:
      PORT: 3000
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: todo_db
      DB_USER: postgres
      DB_PASSWORD: postgres

  frontend:
    environment:
      VITE_API_URL: http://localhost:3000/api
```

You can override these by creating a `docker-compose.override.yml` file:

```yaml
version: "3.8"
services:
  backend:
    environment:
      DB_PASSWORD: my_custom_password
  frontend:
    environment:
      VITE_API_URL: http://backend:3000/api
```

## 🔄 Changing Environment Variables

### During Development

**Backend:**
1. Edit `demo-be/.env`
2. Restart the server: `npm run dev`

**Frontend:**
1. Edit `demo-fe/.env`
2. Restart Vite: `npm run dev`

### In Production

**Backend:**
1. Set environment variables in your hosting platform
2. Or use `.env` file (ensure it's secure)
3. Restart the application

**Frontend:**
1. Update `VITE_API_URL` before building
2. Rebuild: `npm run build`
3. Deploy the new build

## 📝 Environment Variable Loading

### Backend (Node.js)
- Uses `dotenv` package
- Loads from `.env` file
- Accessed via `process.env.VARIABLE_NAME`

```typescript
// In code
const port = process.env.PORT || 3000;
```

### Frontend (Vite)
- Vite automatically loads `.env` files
- Only variables prefixed with `VITE_` are exposed
- Accessed via `import.meta.env.VITE_VARIABLE_NAME`

```typescript
// In code
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🧪 Testing Different Configurations

Create multiple `.env` files for testing:

```bash
# Development
.env.development

# Testing
.env.test

# Production
.env.production
```

Load specific file:
```bash
# Backend
NODE_ENV=production node -r dotenv/config src/server.js

# Frontend (Vite handles this automatically)
npm run build --mode production
```

## ⚠️ Troubleshooting

### Backend can't connect to database

**Check these variables:**
```bash
echo "Host: $DB_HOST"
echo "Port: $DB_PORT"
echo "Database: $DB_NAME"
echo "User: $DB_USER"
```

**Common issues:**
- Wrong `DB_HOST` (use `localhost` not `127.0.0.1` if PostgreSQL is local)
- Wrong `DB_PASSWORD`
- Database doesn't exist
- PostgreSQL not running

### Frontend can't connect to backend

**Check:**
```bash
cat demo-fe/.env | grep VITE_API_URL
```

**Common issues:**
- Wrong URL (should include `http://` or `https://`)
- Wrong port number
- Missing `/api` at the end
- Backend not running
- CORS issues (if backend on different domain)

### Environment variables not loading

**Backend:**
```bash
# Verify .env exists
ls -la demo-be/.env

# Check content
cat demo-be/.env

# Ensure no syntax errors (no spaces around =)
PORT=3000  ✅
PORT = 3000  ❌
```

**Frontend:**
```bash
# Verify .env exists
ls -la demo-fe/.env

# Check content
cat demo-fe/.env

# Ensure VITE_ prefix
VITE_API_URL=http://localhost:3000/api  ✅
API_URL=http://localhost:3000/api  ❌
```

## 📚 Additional Resources

- [dotenv documentation](https://github.com/motdotla/dotenv)
- [Vite environment variables](https://vitejs.dev/guide/env-and-mode.html)
- [PostgreSQL connection strings](https://www.postgresql.org/docs/current/libpq-connect.html)

## 🎯 Quick Reference

### Complete Backend .env Template
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_db
DB_USER=postgres
DB_PASSWORD=your_password_here
```

### Complete Frontend .env Template
```env
VITE_API_URL=http://localhost:3000/api
```

---

**Need help?** Check the troubleshooting section or refer to the main [README.md](README.md)

