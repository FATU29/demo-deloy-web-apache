#!/bin/bash

# Todo App Setup Script
# This script helps set up the todo application quickly

echo "🚀 Todo App Setup Script"
echo "========================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

if ! command_exists psql; then
    echo -e "${RED}❌ PostgreSQL is not installed${NC}"
    echo "Please install PostgreSQL"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites are installed${NC}"
echo ""

# Setup Backend
echo -e "${BLUE}📦 Setting up Backend...${NC}"
cd demo-be

if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo -e "${GREEN}✅ Created .env file${NC}"
    echo -e "${RED}⚠️  Please edit demo-be/.env with your PostgreSQL credentials${NC}"
else
    echo ".env already exists"
fi

echo "Installing backend dependencies..."
npm install
echo -e "${GREEN}✅ Backend dependencies installed${NC}"
echo ""

# Setup Frontend
echo -e "${BLUE}📦 Setting up Frontend...${NC}"
cd ../demo-fe

if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo -e "${GREEN}✅ Created .env file${NC}"
else
    echo ".env already exists"
fi

echo "Installing frontend dependencies..."
npm install
echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
echo ""

# Database setup instructions
cd ..
echo -e "${BLUE}🗄️  Database Setup Instructions:${NC}"
echo ""
echo "1. Connect to PostgreSQL:"
echo "   psql -U postgres"
echo ""
echo "2. Create the database:"
echo "   CREATE DATABASE todo_db;"
echo ""
echo "3. Exit psql and run the init script:"
echo "   psql -U postgres -d todo_db -f demo-be/database/init.sql"
echo ""

echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "📝 Next steps:"
echo "1. Configure demo-be/.env with your PostgreSQL credentials"
echo "2. Setup the database (see instructions above)"
echo "3. Start the backend: cd demo-be && npm run dev"
echo "4. Start the frontend: cd demo-fe && npm run dev"
echo ""
echo "Happy coding! 🎉"

