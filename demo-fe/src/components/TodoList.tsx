import type { Todo } from "../types/todo.types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  onToggle: (id: number) => void;
  onUpdate: (id: number, title: string, description: string) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({
  todos,
  filter,
  onToggle,
  onUpdate,
  onDelete,
}: TodoListProps) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <svg
          className="w-16 h-16 mx-auto text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="text-gray-500 text-lg">
          {filter === "completed" && "No completed tasks yet"}
          {filter === "active" && "No active tasks"}
          {filter === "all" && "No tasks yet. Create one to get started!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
