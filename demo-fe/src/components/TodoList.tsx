import type { Todo } from "../types/todo.types";
import TodoItem from "./TodoItem";
import { Card, CardContent, CardTitle, CardDescription } from "./ui/card";
import { ListTodo } from "lucide-react";

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
      <Card>
        <CardContent className="py-16 text-center">
          <ListTodo
            className="h-20 w-20 mx-auto mb-6 text-muted-foreground"
            strokeWidth={1.5}
          />
          <CardTitle className="mb-3">
            {filter === "completed" && "No Completed Tasks"}
            {filter === "active" && "No Active Tasks"}
            {filter === "all" && "No Tasks Yet"}
          </CardTitle>
          <CardDescription>
            {filter === "completed" &&
              "Complete some tasks to see them here. Keep up the great work! 🎯"}
            {filter === "active" &&
              "All caught up! You have no pending tasks at the moment. 🎉"}
            {filter === "all" &&
              "Get started by creating your first task above. Let's be productive! 💪"}
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="space-y-3">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
