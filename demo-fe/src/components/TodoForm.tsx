import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface TodoFormProps {
  onSubmit: (title: string, description: string) => void;
  isLoading?: boolean;
}

export default function TodoForm({ onSubmit, isLoading }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title, description);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Task
        </CardTitle>
        <CardDescription>Add a new task to your todo list</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset className="space-y-2" disabled={isLoading}>
            <Label htmlFor="title">
              Task Title <span className="text-destructive">*</span>
            </Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need to do?"
              required
            />
          </fieldset>

          <fieldset className="space-y-2" disabled={isLoading}>
            <Label htmlFor="description">
              Description{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details about your task..."
              rows={3}
            />
          </fieldset>

          <section className="flex gap-2">
            <Button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </>
              )}
            </Button>

            {(title || description) && !isLoading && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setTitle("");
                  setDescription("");
                }}
              >
                Clear
              </Button>
            )}
          </section>
        </form>
      </CardContent>
    </Card>
  );
}
