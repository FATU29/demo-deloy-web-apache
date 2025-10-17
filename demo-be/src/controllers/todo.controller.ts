import { Request, Response } from "express";
import pool from "../config/database";
import { CreateTodoDto, UpdateTodoDto } from "../models/todo.model";

export class TodoController {
  // Get all todos with pagination
  async getAllTodos(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      // Get total count
      const countResult = await pool.query("SELECT COUNT(*) FROM todos");
      const total = parseInt(countResult.rows[0].count);

      // Get paginated todos
      const result = await pool.query(
        "SELECT * FROM todos ORDER BY created_at DESC LIMIT $1 OFFSET $2",
        [limit, offset]
      );

      const totalPages = Math.ceil(total / limit);
      const hasMore = page < totalPages;

      res.json({
        success: true,
        data: result.rows,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasMore,
        },
      });
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch todos",
      });
    }
  }

  // Get todo by ID
  async getTodoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await pool.query("SELECT * FROM todos WHERE id = $1", [
        id,
      ]);

      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: "Todo not found",
        });
        return;
      }

      res.json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Error fetching todo:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch todo",
      });
    }
  }

  // Create new todo
  async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const { title, description }: CreateTodoDto = req.body;

      if (!title || title.trim() === "") {
        res.status(400).json({
          success: false,
          message: "Title is required",
        });
        return;
      }

      const result = await pool.query(
        "INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *",
        [title, description || null]
      );

      res.status(201).json({
        success: true,
        data: result.rows[0],
        message: "Todo created successfully",
      });
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create todo",
      });
    }
  }

  // Update todo
  async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, completed }: UpdateTodoDto = req.body;

      // Check if todo exists
      const checkResult = await pool.query(
        "SELECT * FROM todos WHERE id = $1",
        [id]
      );
      if (checkResult.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: "Todo not found",
        });
        return;
      }

      const updates: string[] = [];
      const values: any[] = [];
      let paramIndex = 1;

      if (title !== undefined) {
        updates.push(`title = $${paramIndex}`);
        values.push(title);
        paramIndex++;
      }

      if (description !== undefined) {
        updates.push(`description = $${paramIndex}`);
        values.push(description);
        paramIndex++;
      }

      if (completed !== undefined) {
        updates.push(`completed = $${paramIndex}`);
        values.push(completed);
        paramIndex++;
      }

      if (updates.length === 0) {
        res.status(400).json({
          success: false,
          message: "No fields to update",
        });
        return;
      }

      updates.push(`updated_at = CURRENT_TIMESTAMP`);
      values.push(id);

      const query = `UPDATE todos SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING *`;
      const result = await pool.query(query, values);

      res.json({
        success: true,
        data: result.rows[0],
        message: "Todo updated successfully",
      });
    } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update todo",
      });
    }
  }

  // Delete todo
  async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const result = await pool.query(
        "DELETE FROM todos WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: "Todo not found",
        });
        return;
      }

      res.json({
        success: true,
        message: "Todo deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete todo",
      });
    }
  }

  // Toggle todo completion
  async toggleTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const result = await pool.query(
        "UPDATE todos SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: "Todo not found",
        });
        return;
      }

      res.json({
        success: true,
        data: result.rows[0],
        message: "Todo toggled successfully",
      });
    } catch (error) {
      console.error("Error toggling todo:", error);
      res.status(500).json({
        success: false,
        message: "Failed to toggle todo",
      });
    }
  }
}
