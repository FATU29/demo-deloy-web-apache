import { useState } from "react";
import type { Todo } from "../types/todo.types";

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

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 sm:p-5 mb-4 transition-all hover:shadow-lg ${
        todo.completed ? "opacity-75" : ""
      }`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            autoFocus
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo.id)}
            className="flex-shrink-0 mt-1 w-5 h-5 rounded border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            aria-label={
              todo.completed ? "Mark as incomplete" : "Mark as complete"
            }
          >
            {todo.completed && (
              <svg
                className="w-full h-full text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="flex-grow min-w-0">
            <h3
              className={`text-lg font-semibold text-gray-800 break-words ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p
                className={`text-sm text-gray-600 mt-1 break-words ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.description}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              Created: {new Date(todo.created_at).toLocaleDateString()}{" "}
              {new Date(todo.created_at).toLocaleTimeString()}
            </p>
          </div>

          {/* Actions */}
          <div className="flex-shrink-0 flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Edit"
              aria-label="Edit todo"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Delete"
              aria-label="Delete todo"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
