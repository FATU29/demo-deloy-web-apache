import { useState, useEffect } from "react";
import type { Todo } from "./types/todo.types";
import { todoApi } from "./services/api";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterBar from "./components/FilterBar";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load todos on mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await todoApi.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load todos");
      console.error("Error loading todos:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTodo = async (title: string, description: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const newTodo = await todoApi.createTodo(title, description);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create todo");
      console.error("Error creating todo:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      const updatedTodo = await todoApi.toggleTodo(id);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle todo");
      console.error("Error toggling todo:", err);
    }
  };

  const handleUpdateTodo = async (
    id: number,
    title: string,
    description: string
  ) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, { title, description });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo");
      console.error("Error updating todo:", err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await todoApi.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
      console.error("Error deleting todo:", err);
    }
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
            📝 Todo List App
          </h1>
          <p className="text-gray-600 text-lg">
            Organize your tasks efficiently
          </p>
        </header>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-900"
            >
              ✕
            </button>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && todos.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Loading tasks...</p>
          </div>
        )}

        {/* Main Content */}
        {!isLoading || todos.length > 0 ? (
          <>
            <TodoForm onSubmit={handleCreateTodo} isLoading={isLoading} />

            <FilterBar
              filter={filter}
              onFilterChange={setFilter}
              totalCount={todos.length}
              activeCount={activeCount}
              completedCount={completedCount}
            />

            <TodoList
              todos={todos}
              filter={filter}
              onToggle={handleToggleTodo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          </>
        ) : null}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Built with React + TypeScript + PostgreSQL</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
