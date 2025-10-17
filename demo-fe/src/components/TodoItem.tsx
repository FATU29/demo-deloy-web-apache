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
      className={`
        group bg-white/80 backdrop-blur-lg rounded-2xl shadow-md p-4 sm:p-6 mb-3 sm:mb-4 
        border border-white/20 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]
        ${todo.completed ? "opacity-60 hover:opacity-80" : ""}
        ${isEditing ? "ring-2 ring-blue-500" : ""}
      `}
    >
      {isEditing ? (
        <div className="space-y-4 animate-fade-in">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Edit Title</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm sm:text-base"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Edit Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all text-sm sm:text-base"
              rows={3}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <button
              onClick={handleUpdate}
              className="flex-1 sm:flex-initial px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 sm:flex-initial px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`
              flex-shrink-0 mt-1 w-6 h-6 sm:w-7 sm:h-7 rounded-lg border-2 transition-all duration-300
              focus:ring-2 focus:ring-offset-2 focus:outline-none
              ${todo.completed
                ? "bg-gradient-to-br from-green-500 to-emerald-600 border-green-500 focus:ring-green-500 shadow-md"
                : "border-gray-300 hover:border-blue-500 focus:ring-blue-500 hover:shadow-md"
              }
            `}
            aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {todo.completed && (
              <svg
                className="w-full h-full text-white p-0.5"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 10l3 3 7-7"
                />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="flex-grow min-w-0">
            <h3
              className={`
                text-base sm:text-lg font-semibold break-words transition-all duration-300
                ${todo.completed 
                  ? "line-through text-gray-500" 
                  : "text-gray-800"
                }
              `}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p
                className={`
                  text-sm sm:text-base mt-2 break-words transition-all duration-300
                  ${todo.completed 
                    ? "line-through text-gray-400" 
                    : "text-gray-600"
                  }
                `}
              >
                {todo.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Created:</span>
                <span>{new Date(todo.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{new Date(todo.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              {todo.completed && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Done
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-1.5 sm:gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2.5 sm:p-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md group-hover:ring-1 ring-blue-200"
              title="Edit task"
              aria-label="Edit todo"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2.5 sm:p-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md group-hover:ring-1 ring-red-200"
              title="Delete task"
              aria-label="Delete todo"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
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
