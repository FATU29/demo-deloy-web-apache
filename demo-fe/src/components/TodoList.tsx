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
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 sm:p-12 lg:p-16 text-center border border-white/20 animate-fade-in">
        <div className="max-w-md mx-auto">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <svg
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-gray-300 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
            {filter === "completed" && "No Completed Tasks"}
            {filter === "active" && "No Active Tasks"}
            {filter === "all" && "No Tasks Yet"}
          </h3>
          
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {filter === "completed" && "Complete some tasks to see them here. Keep up the great work! 🎯"}
            {filter === "active" && "All caught up! You have no pending tasks at the moment. 🎉"}
            {filter === "all" && "Get started by creating your first task above. Let's be productive! 💪"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0 animate-fade-in">
      {filteredTodos.map((todo, index) => (
        <div
          key={todo.id}
          style={{
            animationDelay: `${index * 0.05}s`,
            animationFillMode: 'backwards'
          }}
          className="animate-slide-up"
        >
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}
