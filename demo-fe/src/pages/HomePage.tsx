import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import type { Todo } from "../types/todo.types";
import { todoApi } from "../services/api";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import FilterBar from "../components/FilterBar";
import {
  Loader2,
  ListTodo,
  CheckCircle2,
  Clock,
  X,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
  });

  // Load initial todos
  useEffect(() => {
    loadTodos(1, true);
  }, []);

  // Load more when scrolling
  useEffect(() => {
    if (inView && hasMore && !isLoadingMore && !isLoading) {
      loadMoreTodos();
    }
  }, [inView, hasMore, isLoadingMore, isLoading]);

  const loadTodos = async (pageNum: number, isInitial: boolean = false) => {
    try {
      if (isInitial) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);

      const response = await todoApi.getAllTodos(pageNum, 10);

      if (isInitial) {
        setTodos(response.data);
      } else {
        setTodos((prev) => [...prev, ...response.data]);
      }

      setHasMore(response.pagination.hasMore);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load todos");
      console.error("Error loading todos:", err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMoreTodos = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      loadTodos(page + 1, false);
    }
  }, [page, hasMore, isLoadingMore]);

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
    <section className="space-y-6">
      {/* Stats Cards */}
      <article className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tasks
            </CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{todos.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{activeCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{completedCount}</p>
          </CardContent>
        </Card>
      </article>

      {/* Error Message */}
      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <span>Error</span>
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setError(null)}
                aria-label="Close error"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-destructive">
              {error}
            </CardDescription>
          </CardContent>
        </Card>
      )}

      {/* Loading Indicator */}
      {isLoading && todos.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <Loader2 className="h-16 w-16 animate-spin mx-auto mb-4" />
            <CardDescription className="text-lg">
              Loading your tasks...
            </CardDescription>
          </CardContent>
        </Card>
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

          {/* Load More Trigger */}
          {hasMore && todos.length > 0 && (
            <Card ref={loadMoreRef}>
              {isLoadingMore && (
                <CardContent className="py-6 flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <CardDescription>Loading more tasks...</CardDescription>
                </CardContent>
              )}
            </Card>
          )}

          {/* End Message */}
          {!hasMore && todos.length > 0 && (
            <Card>
              <CardContent className="py-6 text-center">
                <CardDescription>
                  🎉 You've reached the end! All {todos.length} tasks loaded.
                </CardDescription>
              </CardContent>
            </Card>
          )}
        </>
      ) : null}
    </section>
  );
}
