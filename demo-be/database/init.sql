-- Create database (run this separately if database doesn't exist)
-- CREATE DATABASE todo_db;

-- Connect to the database
-- \c todo_db;

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at DESC);

-- Insert sample data
INSERT INTO todos (title, description, completed) VALUES
  ('Welcome to Todo App', 'This is your first todo item. You can edit or delete it!', false),
  ('Build the frontend', 'Create a responsive React frontend with Tailwind CSS', false),
  ('Set up PostgreSQL', 'Configure database connection and create tables', true),
  ('Deploy to Apache', 'Deploy the application to Apache server', false)
ON CONFLICT DO NOTHING;

-- Display the created table
SELECT * FROM todos;

