import type { Todo, ApiResponse } from "../types/todo.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface PaginatedResponse<T> {
  success: boolean;
  data: T;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  message?: string;
}

export const todoApi = {
  // Get all todos with pagination
  async getAllTodos(
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Todo[]>> {
    const response = await fetch(
      `${API_URL}/todos?page=${page}&limit=${limit}`
    );
    const data: PaginatedResponse<Todo[]> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch todos");
    return data;
  },

  // Create a new todo
  async createTodo(title: string, description?: string): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    const data: ApiResponse<Todo> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to create todo");
    return data.data!;
  },

  // Update a todo
  async updateTodo(
    id: number,
    updates: { title?: string; description?: string; completed?: boolean }
  ): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    const data: ApiResponse<Todo> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to update todo");
    return data.data!;
  },

  // Toggle todo completion
  async toggleTodo(id: number): Promise<Todo> {
    const response = await fetch(`${API_URL}/todos/${id}/toggle`, {
      method: "PATCH",
    });
    const data: ApiResponse<Todo> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to toggle todo");
    return data.data!;
  },

  // Delete a todo
  async deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse<void> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to delete todo");
  },
};
