import { useState } from "react";

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
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Task Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          disabled={isLoading}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description..."
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !title.trim()}
        className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        {isLoading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
