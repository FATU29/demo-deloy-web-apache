#!/bin/bash

# Git Setup Verification Script
# This script verifies that Git is properly configured to track .env.example
# files while ignoring actual .env files

echo "🔍 Git Setup Verification"
echo "========================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${RED}❌ Git repository not initialized${NC}"
    echo "Run: git init"
    exit 1
fi

echo -e "${GREEN}✅ Git repository initialized${NC}"
echo ""

# Check .env.example files exist
echo "📄 Checking .env.example files..."
if [ -f "demo-be/.env.example" ]; then
    echo -e "${GREEN}✅ demo-be/.env.example exists${NC}"
else
    echo -e "${RED}❌ demo-be/.env.example missing${NC}"
fi

if [ -f "demo-fe/.env.example" ]; then
    echo -e "${GREEN}✅ demo-fe/.env.example exists${NC}"
else
    echo -e "${RED}❌ demo-fe/.env.example missing${NC}"
fi
echo ""

# Check if .env.example files are tracked
echo "🔎 Checking if .env.example files are tracked by Git..."
if git ls-files --error-unmatch demo-be/.env.example >/dev/null 2>&1; then
    echo -e "${GREEN}✅ demo-be/.env.example is tracked${NC}"
else
    echo -e "${YELLOW}⚠️  demo-be/.env.example not yet tracked (needs git add)${NC}"
fi

if git ls-files --error-unmatch demo-fe/.env.example >/dev/null 2>&1; then
    echo -e "${GREEN}✅ demo-fe/.env.example is tracked${NC}"
else
    echo -e "${YELLOW}⚠️  demo-fe/.env.example not yet tracked (needs git add)${NC}"
fi
echo ""

# Check if .env files are ignored
echo "🚫 Checking if .env files are ignored..."

# Create temporary .env files if they don't exist
[ ! -f "demo-be/.env" ] && touch demo-be/.env.tmp && CLEANUP_BE=1
[ ! -f "demo-fe/.env" ] && touch demo-fe/.env.tmp && CLEANUP_FE=1

if git check-ignore demo-be/.env >/dev/null 2>&1 || git check-ignore demo-be/.env.tmp >/dev/null 2>&1; then
    echo -e "${GREEN}✅ demo-be/.env is ignored${NC}"
else
    echo -e "${RED}❌ demo-be/.env is NOT ignored (SECURITY RISK!)${NC}"
fi

if git check-ignore demo-fe/.env >/dev/null 2>&1 || git check-ignore demo-fe/.env.tmp >/dev/null 2>&1; then
    echo -e "${GREEN}✅ demo-fe/.env is ignored${NC}"
else
    echo -e "${RED}❌ demo-fe/.env is NOT ignored (SECURITY RISK!)${NC}"
fi

# Cleanup temporary files
[ -n "$CLEANUP_BE" ] && rm -f demo-be/.env.tmp
[ -n "$CLEANUP_FE" ] && rm -f demo-fe/.env.tmp

echo ""

# Check .gitignore files exist
echo "📋 Checking .gitignore files..."
if [ -f ".gitignore" ]; then
    echo -e "${GREEN}✅ Root .gitignore exists${NC}"
else
    echo -e "${RED}❌ Root .gitignore missing${NC}"
fi

if [ -f "demo-be/.gitignore" ]; then
    echo -e "${GREEN}✅ demo-be/.gitignore exists${NC}"
else
    echo -e "${YELLOW}⚠️  demo-be/.gitignore missing${NC}"
fi

if [ -f "demo-fe/.gitignore" ]; then
    echo -e "${GREEN}✅ demo-fe/.gitignore exists${NC}"
else
    echo -e "${YELLOW}⚠️  demo-fe/.gitignore missing${NC}"
fi
echo ""

# Check for accidentally staged .env files
echo "🔒 Checking for accidentally staged .env files..."
STAGED_ENV=$(git diff --cached --name-only | grep -E "\.env$" | grep -v ".env.example")
if [ -z "$STAGED_ENV" ]; then
    echo -e "${GREEN}✅ No .env files staged${NC}"
else
    echo -e "${RED}❌ WARNING: .env files are staged:${NC}"
    echo "$STAGED_ENV"
    echo -e "${YELLOW}Run: git reset HEAD <file>${NC}"
fi
echo ""

# Summary
echo "=============================="
echo "Summary"
echo "=============================="
echo ""
echo "Expected behavior:"
echo "  ✅ .env.example files should be tracked"
echo "  ✅ .env files should be ignored"
echo "  ✅ .gitignore files should exist"
echo ""
echo "To commit .env.example files:"
echo "  git add demo-be/.env.example demo-fe/.env.example"
echo "  git commit -m 'Add environment configuration examples'"
echo ""
echo "To push to remote:"
echo "  git remote add origin <your-repo-url>"
echo "  git push -u origin main"
echo ""

