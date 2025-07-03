import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // match your user model name
    required: true,
  }
},{
  timestamps: true
})

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;