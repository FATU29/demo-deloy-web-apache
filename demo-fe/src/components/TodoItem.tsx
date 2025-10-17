import { useState } from "react";
import type { Todo } from "../types/todo.types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Edit, Trash2, Save, X, Calendar, Clock } from "lucide-react";
import { Separator } from "./ui/separator";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onUpdate: (id: number, title: string, description: string) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description || ""
  );

  const handleUpdate = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, editTitle, editDescription);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card>
        <CardContent className="pt-6 space-y-4">
          <fieldset className="space-y-2">
            <Label htmlFor={`edit-title-${todo.id}`}>Edit Title</Label>
            <Input
              id={`edit-title-${todo.id}`}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              autoFocus
            />
          </fieldset>

          <fieldset className="space-y-2">
            <Label htmlFor={`edit-desc-${todo.id}`}>Edit Description</Label>
            <Textarea
              id={`edit-desc-${todo.id}`}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={3}
            />
          </fieldset>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button onClick={handleUpdate} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
          <Button onClick={handleCancel} variant="outline" className="flex-1">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className={todo.completed ? "opacity-60" : ""}>
      <CardContent className="pt-6">
        <article className="flex items-start gap-4">
          {/* Checkbox */}
          <Checkbox
            id={`todo-${todo.id}`}
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            className="mt-1"
          />

          {/* Content */}
          <section className="flex-1 min-w-0 space-y-3">
            <Label
              htmlFor={`todo-${todo.id}`}
              className={`text-base font-semibold cursor-pointer ${
                todo.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {todo.title}
            </Label>

            {todo.description && (
              <p
                className={`text-sm ${
                  todo.completed
                    ? "line-through text-muted-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {todo.description}
              </p>
            )}

            <Separator />

            <section className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={todo.created_at}>
                  {new Date(todo.created_at).toLocaleDateString()}
                </time>
              </span>

              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <time dateTime={todo.created_at}>
                  {new Date(todo.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </span>

              {todo.completed && (
                <Badge variant="secondary" className="text-xs">
                  ✓ Done
                </Badge>
              )}
            </section>
          </section>

          {/* Actions */}
          <section className="flex gap-2">
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="icon"
              title="Edit task"
              aria-label="Edit todo"
            >
              <Edit className="h-4 w-4" />
            </Button>

            <Button
              onClick={() => onDelete(todo.id)}
              variant="outline"
              size="icon"
              title="Delete task"
              aria-label="Delete todo"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </section>
        </article>
      </CardContent>
    </Card>
  );
}
