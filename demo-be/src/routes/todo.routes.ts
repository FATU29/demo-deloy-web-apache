import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";

const router = Router();
const todoController = new TodoController();

// Define routes
router.get("/", todoController.getAllTodos.bind(todoController));
router.get("/:id", todoController.getTodoById.bind(todoController));
router.post("/", todoController.createTodo.bind(todoController));
router.put("/:id", todoController.updateTodo.bind(todoController));
router.patch("/:id/toggle", todoController.toggleTodo.bind(todoController));
router.delete("/:id", todoController.deleteTodo.bind(todoController));

export default router;
