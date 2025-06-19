import Todo from "../models/todo.model.js"

export const getAllTodos = async (req, res) => {
  try {
    const todo = await Todo.find({});
    res.status(200).json(todo);
  } catch (error) {
    console.log("Error in getTodos",error);
    res.status(500).json({message: error.message})
  }
}
export const getSingleTodo = async (req, res) => {
  try {
    const {id} = req.params
    const todo = await Todo.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    console.log("Error in getTodos",error);
    res.status(500).json({message: error.message})
  }
}
export const createTodo = async (req, res) => {
  try {
    const {title, desc} = req.body;
    const todo = await Todo.create({title, desc});
    res.status(201).json(todo);
  } catch (error) {
    console.log("Error in getTodos",error);
    res.status(500).json({message: error.message})
  }
}
export const updateTodo = async (req, res) => {
  try {
    const {id}  = req.params;
    const {title, desc} = req.body;
    const todo = await Todo.findById(id);
    if(!todo){
      return res.status(400).json({message: "Todo not found"})
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, {title, desc}, {new: true});
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log("Error in getTodos",error);
    res.status(500).json({message: error.message})
  }
}
export const deleteTodo = async (req, res) => {
  try {
    const {id}  = req.params;
    const todo = await Todo.findById(id);
    if(!todo){
      return res.status(400).json({message: "Todo not found"})
    }

    await Todo.findByIdAndDelete(id)
    res.status(200).json({message: "Todo deleted successfully"}); 
  } catch (error) {
    console.log("Error in getTodos",error);
    res.status(500).json({message: error.message})
  }
}