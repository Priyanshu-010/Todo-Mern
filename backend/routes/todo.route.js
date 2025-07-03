import express from "express"
import { createTodo, deleteTodo, getAllTodos, getSingleTodo, updateTodo } from "../controllers/todo.controller.js";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/", authMiddleware ,getAllTodos);
router.get("/:id",authMiddleware, getSingleTodo);
router.post("/",authMiddleware, createTodo);
router.put("/:id",authMiddleware, updateTodo);
router.delete("/:id",authMiddleware, deleteTodo);

export default router