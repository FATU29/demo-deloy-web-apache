# Installation Guide

Complete step-by-step instructions for setting up the Todo List application.

## 📋 Prerequisites Check

Before starting, ensure you have:

```bash
# Check Node.js (need v18+)
node --version

# Check npm
npm --version

# Check PostgreSQL
psql --version

# Check Git (optional)
git --version

# Check Docker (optional, for Docker setup)
docker --version
docker-compose --version
```

If any are missing, install them first.

## 🚀 Installation Methods

Choose the method that works best for you:

### Method 1: Automated Setup Script (Recommended)

The fastest way to set up manually:

```bash
# 1. Navigate to project root
cd /home/fat/code/linux/demo-deloy-apache

# 2. Run setup script
./setup.sh

# 3. Follow the on-screen instructions
```

The script will:
- ✅ Check prerequisites
- ✅ Create `.env` files from examples
- ✅ Install backend dependencies
- ✅ Install frontend dependencies
- ✅ Provide database setup instructions

### Method 2: Docker Compose (Easiest)

No manual configuration needed:

```bash
# 1. Start all services
docker-compose up

# That's it! Services will be available at:
# - Frontend: http://localhost:5173
# - Backend: http://localhost:3000
# - PostgreSQL: localhost:5432
```

The database will be automatically initialized with sample data.

To run in background:
```bash
docker-compose up -d
```

To stop:
```bash
docker-compose down
```

### Method 3: Manual Setup (Most Control)

Full manual installation:

#### Step 1: Install Backend Dependencies

```bash
cd demo-be
npm install
```

Expected packages:
- express
- pg (PostgreSQL client)
- cors
- dotenv
- TypeScript and type definitions

#### Step 2: Configure Backend Environment

```bash
# Copy environment template
cp .env.example .env

# Edit with your preferred editor
nano .env
# or
code .env
```

Update these values:
```env
PORT=3000                    # Backend port
DB_HOST=localhost            # Database host
DB_PORT=5432                 # PostgreSQL port
DB_NAME=todo_db              # Database name
DB_USER=postgres             # Your PostgreSQL username
DB_PASSWORD=your_password    # Your PostgreSQL password
```

#### Step 3: Setup PostgreSQL Database

**Option A: Using psql command line**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE todo_db;

# Exit psql
\q

# Run initialization script
psql -U postgres -d todo_db -f database/init.sql
```

**Option B: Using pgAdmin or other GUI**

1. Connect to your PostgreSQL server
2. Create a new database named `todo_db`
3. Open a query tool
4. Copy and paste contents of `demo-be/database/init.sql`
5. Execute the script

#### Step 4: Install Frontend Dependencies

```bash
cd ../demo-fe
npm install
```

Expected packages:
- react
- react-dom
- tailwindcss
- vite
- TypeScript and type definitions

#### Step 5: Configure Frontend Environment

```bash
# Copy environment template
cp .env.example .env

# Edit if needed (default should work)
nano .env
```

Default configuration:
```env
VITE_API_URL=http://localhost:3000/api
```

Only change if your backend runs on a different URL.

## ✅ Verify Installation

### 1. Check Backend

```bash
cd demo-be

# Start backend
npm run dev
```

You should see:
```
✅ Connected to PostgreSQL database
🚀 Server is running on http://localhost:3000
```

Test the API:
```bash
# In a new terminal
curl http://localhost:3000/api/todos
```

Expected response: JSON array with sample todos

### 2. Check Frontend

```bash
cd demo-fe

# Start frontend
npm run dev
```

You should see:
```
VITE v7.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

Open http://localhost:5173 in your browser.

### 3. Test Full Functionality

1. ✅ See sample todos loaded
2. ✅ Create a new todo
3. ✅ Edit an existing todo
4. ✅ Toggle completion status
5. ✅ Delete a todo
6. ✅ Filter by all/active/completed
7. ✅ Check responsive design (resize browser)

## 🔧 Troubleshooting Installation

### Backend won't start

**Error: "Cannot find module 'pg'"**
```bash
cd demo-be
npm install pg @types/pg
```

**Error: "Cannot find module 'cors'"**
```bash
cd demo-be
npm install cors @types/cors
```

**Error: "Database connection failed"**
- Check PostgreSQL is running:
  ```bash
  sudo systemctl status postgresql
  # or on macOS:
  brew services list
  ```
- Verify credentials in `demo-be/.env`
- Check if database exists:
  ```bash
  psql -U postgres -l | grep todo_db
  ```

### Frontend won't start

**Error: "Cannot find module"**
```bash
cd demo-fe
rm -rf node_modules package-lock.json
npm install
```

**Error: "Port 5173 is already in use"**
- Stop the other process using port 5173
- Or change the port in vite.config.ts

### Frontend can't connect to backend

**Error in browser console: "Network Error" or "CORS error"**
- Verify backend is running: `curl http://localhost:3000`
- Check `VITE_API_URL` in `demo-fe/.env`
- Restart frontend after changing `.env`

### Database issues

**Error: "psql: command not found"**
- PostgreSQL is not installed
- Install: 
  ```bash
  # Ubuntu/Debian
  sudo apt install postgresql postgresql-contrib
  
  # macOS
  brew install postgresql@15
  
  # Windows
  # Download from https://www.postgresql.org/download/windows/
  ```

**Error: "database 'todo_db' does not exist"**
```bash
psql -U postgres -c "CREATE DATABASE todo_db;"
psql -U postgres -d todo_db -f demo-be/database/init.sql
```

**Error: "password authentication failed"**
- Check your PostgreSQL password
- Update `demo-be/.env` with correct password
- Reset password if needed:
  ```bash
  sudo -u postgres psql
  ALTER USER postgres PASSWORD 'newpassword';
  ```

### Docker issues

**Error: "docker: command not found"**
- Docker is not installed
- Install from: https://docs.docker.com/get-docker/

**Error: "port is already allocated"**
- Another service is using the port
- Stop conflicting services:
  ```bash
  # Stop local PostgreSQL
  sudo systemctl stop postgresql
  
  # Or change ports in docker-compose.yml
  ```

**Error: "network timeout"**
- Check internet connection
- Or use: `docker-compose up --build --no-cache`

## 🔄 Reinstallation

If you need to start fresh:

```bash
# Remove dependencies
cd demo-be && rm -rf node_modules package-lock.json
cd ../demo-fe && rm -rf node_modules package-lock.json

# Remove database (if needed)
psql -U postgres -c "DROP DATABASE IF EXISTS todo_db;"

# Run setup again
cd ..
./setup.sh
```

## 📦 Production Installation

For production deployment:

### 1. Build Backend
```bash
cd demo-be
npm install --production
npm run build
```

### 2. Build Frontend
```bash
cd demo-fe

# Update API URL for production
echo "VITE_API_URL=https://api.yourdomain.com/api" > .env

npm install
npm run build
```

### 3. Deploy
- Backend: Use PM2 or systemd service
- Frontend: Copy `dist/` to Apache web root
- Database: Use managed PostgreSQL service

See [README.md](README.md#-apache-deployment) for detailed deployment instructions.

## 🎯 Next Steps

After successful installation:

1. ✅ Read [QUICKSTART.md](QUICKSTART.md) for usage guide
2. ✅ Explore the code structure
3. ✅ Try modifying the app
4. ✅ Check [README.md](README.md) for advanced features
5. ✅ Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for overview

## 💡 Development Tips

```bash
# Backend hot reload (auto-restart on changes)
cd demo-be && npm run dev

# Frontend hot reload (instant updates)
cd demo-fe && npm run dev

# Type checking
cd demo-be && npx tsc --noEmit
cd demo-fe && npx tsc --noEmit

# Linting
cd demo-fe && npm run lint

# View logs
cd demo-be && npm run dev 2>&1 | tee backend.log
```

## 📞 Still Having Issues?

1. Check all prerequisites are installed and up to date
2. Verify `.env` files exist and have correct values
3. Check file permissions: `chmod +x setup.sh`
4. Review console/terminal for specific error messages
5. Ensure ports 3000, 5173, and 5432 are available
6. Try Docker method if manual setup fails

---

Need help? Check the troubleshooting sections in:
- [README.md](README.md#-troubleshooting)
- [demo-be/README.md](demo-be/README.md)
- [demo-fe/README.md](demo-fe/README.md)

