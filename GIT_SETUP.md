# Git Setup Guide

Complete guide for setting up version control for the Todo List application.

## 📋 Overview

This guide helps you properly set up Git to track your code while keeping sensitive information (like passwords) secure.

## ✅ What Gets Committed

### Tracked Files (Committed to Git)
- ✅ All source code (`.ts`, `.tsx`, `.js`, etc.)
- ✅ Configuration files (`.json`, `.yml`, `.config.js`)
- ✅ `.env.example` files (template without secrets)
- ✅ Documentation (`.md` files)
- ✅ Database schemas (`.sql` files)
- ✅ Docker configurations
- ✅ Build scripts

### Ignored Files (NOT Committed)
- ❌ `.env` files (contain passwords and secrets)
- ❌ `node_modules/` (dependencies)
- ❌ `dist/` and `build/` (compiled code)
- ❌ Log files
- ❌ IDE-specific files
- ❌ OS-specific files

## 🚀 Initial Git Setup

### 1. Initialize Repository

```bash
cd /home/fat/code/linux/demo-deloy-apache
git init
```

### 2. Configure Git User (if not already done)

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Or set globally
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Verify .gitignore is Working

```bash
# Check what files will be tracked
git status

# Verify .env files are ignored
git status --ignored | grep ".env"
```

You should see:
- ✅ `.env.example` files ready to be tracked
- ❌ `.env` files in the ignored list

### 4. Add Files to Git

```bash
# Add all files (respecting .gitignore)
git add .

# Or add specific files
git add demo-be/.env.example
git add demo-fe/.env.example
git add README.md
git add package.json
```

### 5. Create Initial Commit

```bash
git commit -m "Initial commit: Todo List app with React, Express, PostgreSQL"
```

## 📤 Pushing to Remote Repository

### GitHub

```bash
# Create repository on GitHub first, then:
git remote add origin https://github.com/yourusername/todo-app.git
git branch -M main
git push -u origin main
```

### GitLab

```bash
git remote add origin https://gitlab.com/yourusername/todo-app.git
git branch -M main
git push -u origin main
```

### Bitbucket

```bash
git remote add origin https://bitbucket.org/yourusername/todo-app.git
git branch -M main
git push -u origin main
```

## 🔐 Verifying .env.example Files Are Tracked

### Test Commands

```bash
# Check if .env.example files are staged
git status | grep ".env.example"

# Verify .env files are NOT staged
git status | grep -E "\.env$"

# List all tracked files
git ls-files | grep ".env"
# Should only show .env.example files

# Check ignored files
git status --ignored | grep ".env"
# Should show .env files as ignored
```

### Expected Output

```bash
# After git add .
$ git status
On branch main

Changes to be committed:
  new file:   demo-be/.env.example
  new file:   demo-fe/.env.example
  ...

# .env files should NOT appear here!
```

## 🛡️ Security Checklist

Before pushing to remote:

- [ ] `.env` files are in `.gitignore`
- [ ] `.env.example` files contain NO real passwords
- [ ] `.env.example` files use placeholder values
- [ ] Test: `git status` doesn't show `.env` files
- [ ] `node_modules/` are ignored
- [ ] No sensitive data in commit history

### Double-Check Command

```bash
# This should return NOTHING
git diff --cached | grep -E "(password|secret|key).*=.*[^example|your_]"
```

## 📋 .gitignore Patterns Explained

### Root `.gitignore`

```gitignore
# Ignore all .env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# EXCEPT .env.example files (negation pattern)
!.env.example
!**/.env.example
```

The `!` prefix means "don't ignore this pattern"

### Backend `.gitignore`

```gitignore
.env           # Ignore .env
!.env.example  # But allow .env.example
```

### Frontend `.gitignore`

```gitignore
.env           # Ignore .env
!.env.example  # But allow .env.example
```

## 🔄 Workflow After Setup

### Daily Development

```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Add feature XYZ"

# Push
git push
```

### Adding New Features

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# ...

# Commit changes
git add .
git commit -m "Implement new feature"

# Push branch
git push -u origin feature/new-feature

# Create pull request on GitHub/GitLab
```

## 🚨 If You Accidentally Committed .env

### Remove from Staging (Before Commit)

```bash
git reset HEAD demo-be/.env
git reset HEAD demo-fe/.env
```

### Remove from Last Commit (After Commit, Before Push)

```bash
git reset HEAD~1
# Add only what you want
git add .
git commit -m "Your message"
```

### Remove from History (After Push - DANGEROUS!)

```bash
# Use git-filter-branch or BFG Repo-Cleaner
# THIS REWRITES HISTORY!

# Better option: Rotate all secrets immediately
# Then remove from history:
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch demo-be/.env demo-fe/.env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (requires team coordination)
git push origin --force --all
```

**Important:** If you've pushed secrets, assume they're compromised. Change all passwords immediately!

## 📦 Cloning Repository (For Team Members)

When someone clones your repository:

```bash
# Clone the repository
git clone https://github.com/yourusername/todo-app.git
cd todo-app

# Create .env files from examples
cp demo-be/.env.example demo-be/.env
cp demo-fe/.env.example demo-fe/.env

# Edit .env files with actual values
nano demo-be/.env
nano demo-fe/.env

# Install dependencies
cd demo-be && npm install
cd ../demo-fe && npm install

# Start development
```

## 🔍 Useful Git Commands

### Check What's Tracked

```bash
# All tracked files
git ls-files

# Only .env related files
git ls-files | grep ".env"

# Check if specific file is tracked
git ls-files | grep "demo-be/.env.example"
```

### Check What's Ignored

```bash
# Show ignored files
git status --ignored

# Show only .env files
git status --ignored | grep ".env"

# Test if file would be ignored
git check-ignore demo-be/.env
# Returns the file path if ignored
```

### View .gitignore Rules

```bash
# Show all gitignore files
find . -name ".gitignore" -exec echo {} \; -exec cat {} \;

# Test which .gitignore rule matches a file
git check-ignore -v demo-be/.env
```

## 📝 Sample Commit Messages

```bash
# Initial setup
git commit -m "Initial commit: Todo app with React, Express, PostgreSQL"

# Features
git commit -m "feat: Add todo filtering functionality"
git commit -m "feat: Implement inline todo editing"

# Fixes
git commit -m "fix: Resolve database connection timeout"
git commit -m "fix: Correct API endpoint CORS configuration"

# Documentation
git commit -m "docs: Update installation instructions"
git commit -m "docs: Add API endpoint documentation"

# Configuration
git commit -m "config: Add Docker Compose configuration"
git commit -m "config: Update .env.example with new variables"

# Refactoring
git commit -m "refactor: Improve todo controller error handling"
git commit -m "refactor: Extract API client to separate service"
```

## 🌿 Branching Strategy

### Simple Strategy (For Solo Development)

```bash
main            # Production-ready code
└── develop     # Development branch
    └── feature/xyz  # Feature branches
```

### Commands

```bash
# Create develop branch
git checkout -b develop

# Create feature branch
git checkout -b feature/add-user-auth

# Merge feature back
git checkout develop
git merge feature/add-user-auth

# Merge to main when ready
git checkout main
git merge develop
```

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)
- [Git Ignore Patterns](https://git-scm.com/docs/gitignore)

## ✅ Quick Verification Checklist

Before your first push:

```bash
# 1. Check .env is ignored
git status | grep -E "\.env$" | wc -l
# Should output: 0

# 2. Check .env.example is tracked
git ls-files | grep ".env.example" | wc -l
# Should output: 2 (or more if you have more)

# 3. Check no secrets in staged files
git diff --cached | grep -i "password.*=.*" | grep -v "your_password"
# Should output: nothing

# 4. Verify node_modules are ignored
git status | grep "node_modules" | wc -l
# Should output: 0
```

## 🎯 Summary

### Key Points

1. ✅ `.env.example` files **ARE** committed (templates)
2. ❌ `.env` files **ARE NOT** committed (contain secrets)
3. ✅ `.gitignore` protects sensitive data
4. ✅ Use `!.env.example` pattern to allow example files
5. ✅ Always double-check before pushing

### Quick Commands

```bash
# Initialize
git init

# Add .env.example files specifically
git add demo-be/.env.example demo-fe/.env.example

# Verify
git status | grep ".env"

# Commit
git commit -m "Add environment configuration examples"

# Push
git push origin main
```

---

**Remember:** If you ever accidentally commit secrets, assume they're compromised and rotate them immediately!

