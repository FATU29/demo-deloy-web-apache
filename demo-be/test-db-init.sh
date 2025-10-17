#!/bin/bash

# Test script for database initialization
# This script verifies that auto-migration and seeding works correctly

set -e

echo "🧪 Testing Database Initialization..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if PostgreSQL is running
echo "1. Checking PostgreSQL..."
if pg_isready -U postgres > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} PostgreSQL is running"
else
    echo -e "${RED}✗${NC} PostgreSQL is not running"
    echo "   Please start PostgreSQL first"
    exit 1
fi

# Create test database
echo ""
echo "2. Creating test database..."
psql -U postgres -c "DROP DATABASE IF EXISTS todo_db_test;" > /dev/null 2>&1
psql -U postgres -c "CREATE DATABASE todo_db_test;" > /dev/null 2>&1
echo -e "${GREEN}✓${NC} Test database created"

# Create test .env
echo ""
echo "3. Creating test environment..."
cat > .env.test << EOF
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_db_test
DB_USER=postgres
DB_PASSWORD=postgres
AUTO_SEED=true
FORCE_SEED=false
NODE_ENV=development
EOF
echo -e "${GREEN}✓${NC} Test environment configured"

# Build the project
echo ""
echo "4. Building TypeScript..."
npm run build > /dev/null 2>&1
echo -e "${GREEN}✓${NC} Build successful"

# Test auto-migration (without seeding first)
echo ""
echo "5. Testing auto-migration..."
NODE_ENV=test AUTO_SEED=false node -e "
require('dotenv').config({ path: '.env.test' });
const { runMigrations } = require('./dist/utils/db-init.js');
runMigrations()
  .then(() => {
    console.log('  Migration test passed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('  Migration test failed:', err.message);
    process.exit(1);
  });
"
echo -e "${GREEN}✓${NC} Auto-migration works"

# Test seeding
echo ""
echo "6. Testing database seeding..."
NODE_ENV=test node -e "
require('dotenv').config({ path: '.env.test' });
const { seedDatabase } = require('./dist/utils/db-init.js');
seedDatabase(true)
  .then(() => {
    console.log('  Seeding test passed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('  Seeding test failed:', err.message);
    process.exit(1);
  });
"
echo -e "${GREEN}✓${NC} Database seeding works"

# Verify data was inserted
echo ""
echo "7. Verifying mock data..."
COUNT=$(psql -U postgres -d todo_db_test -t -c "SELECT COUNT(*) FROM todos;" | xargs)
if [ "$COUNT" -eq "50" ]; then
    echo -e "${GREEN}✓${NC} 50 mock todos inserted"
else
    echo -e "${RED}✗${NC} Expected 50 todos, found $COUNT"
    exit 1
fi

# Verify completed/active counts
echo ""
echo "8. Verifying todo statistics..."
COMPLETED=$(psql -U postgres -d todo_db_test -t -c "SELECT COUNT(*) FROM todos WHERE completed = true;" | xargs)
ACTIVE=$(psql -U postgres -d todo_db_test -t -c "SELECT COUNT(*) FROM todos WHERE completed = false;" | xargs)
echo -e "${GREEN}✓${NC} $COMPLETED completed, $ACTIVE active todos"

# Test idempotency (run migrations again)
echo ""
echo "9. Testing migration idempotency..."
NODE_ENV=test AUTO_SEED=false node -e "
require('dotenv').config({ path: '.env.test' });
const { runMigrations } = require('./dist/utils/db-init.js');
runMigrations()
  .then(() => {
    console.log('  Idempotency test passed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('  Idempotency test failed:', err.message);
    process.exit(1);
  });
"
echo -e "${GREEN}✓${NC} Migrations are idempotent"

# Cleanup
echo ""
echo "10. Cleaning up..."
rm -f .env.test
psql -U postgres -c "DROP DATABASE todo_db_test;" > /dev/null 2>&1
echo -e "${GREEN}✓${NC} Test database removed"

# Success
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   All tests passed! ✓${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "The database initialization system is working correctly:"
echo "  • Auto-migration: ✓"
echo "  • Auto-seeding: ✓"
echo "  • Mock data: ✓ (50 todos)"
echo "  • Idempotency: ✓"
echo ""
echo "You can now start the backend with:"
echo "  npm run dev"

