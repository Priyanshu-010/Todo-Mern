import express from "express"
import { createTodo, deleteTodo, getAllTodos, getSingleTodo, updateTodo } from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", getAllTodos);
router.get("/:id", getSingleTodo);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router