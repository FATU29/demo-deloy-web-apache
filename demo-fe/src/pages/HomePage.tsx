import { useState, useEffect } from "react";
import type { Todo } from "../types/todo.types";
import { todoApi } from "../services/api";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import FilterBar from "../components/FilterBar";

export default function HomePage() {
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
    <div className="animate-fade-in">
      {/* Stats Bar */}
      <div className="mb-6 sm:mb-8 flex flex-wrap justify-center gap-4 sm:gap-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 sm:px-6 sm:py-3 shadow-sm">
          <div className="text-2xl sm:text-3xl font-bold text-blue-600">
            {todos.length}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Total Tasks</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 sm:px-6 sm:py-3 shadow-sm">
          <div className="text-2xl sm:text-3xl font-bold text-amber-600">
            {activeCount}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 sm:px-6 sm:py-3 shadow-sm">
          <div className="text-2xl sm:text-3xl font-bold text-green-600">
            {completedCount}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Completed</div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 animate-slide-down">
          <div className="bg-red-50/90 backdrop-blur-sm border-l-4 border-red-500 text-red-700 px-4 py-3 sm:px-6 sm:py-4 rounded-r-lg shadow-md flex items-start justify-between">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm sm:text-base">{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-900 transition-colors ml-4 flex-shrink-0"
              aria-label="Close error"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && todos.length === 0 && (
        <div className="text-center py-16 sm:py-20 lg:py-24 animate-fade-in">
          <div className="inline-block">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 mt-6 text-base sm:text-lg font-medium">
            Loading your tasks...
          </p>
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
    </div>
  );
}
