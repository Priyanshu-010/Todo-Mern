import Todo from "../models/todo.model.js";

export const getAllTodos = async (req, res) => {
  try {
    const todo = await Todo.find({ user: req.user.id });
    res.status(200).json(todo);
  } catch (error) {
    console.log("Error in getTodos", error);
    res.status(500).json({ message: error.message });
  }
};

export const getSingleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id, user: req.user.id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (error) {
    console.log("Error in getSingleTodo", error);
    res.status(500).json({ message: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const todo = await Todo.create({ title, desc, user: req.user.id });
    console.log("req.user:", req.user);
    res.status(201).json(todo);
  } catch (error) {
    console.log("Error in createTodo", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, desc },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log("Error in updateTodo", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findOneAndDelete({ _id: id, user: req.user.id });

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log("Error in deleteTodo", error);
    res.status(500).json({ message: error.message });
  }
};
