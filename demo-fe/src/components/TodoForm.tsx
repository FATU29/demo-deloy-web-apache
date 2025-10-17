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
      className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-white/20 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Create New Task</h2>
      </div>

      <div className="space-y-4 sm:space-y-5">
        <div>
          <label
            htmlFor="title"
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
          >
            <span className="text-blue-600">●</span>
            Task Title
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need to do?"
              className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed text-sm sm:text-base"
              disabled={isLoading}
              required
            />
            {title && (
              <button
                type="button"
                onClick={() => setTitle("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear title"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
          >
            <span className="text-indigo-600">●</span>
            Description
            <span className="text-xs text-gray-500 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details about your task..."
              rows={3}
              className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed resize-none text-sm sm:text-base"
              disabled={isLoading}
            />
            {description && (
              <button
                type="button"
                onClick={() => setDescription("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear description"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading || !title.trim()}
            className="flex-1 sm:flex-initial sm:min-w-[200px] px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Task</span>
              </>
            )}
          </button>

          {(title || description) && !isLoading && (
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDescription("");
              }}
              className="px-4 py-3.5 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-all duration-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
