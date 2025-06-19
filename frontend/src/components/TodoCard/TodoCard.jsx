import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate instead of Link
import { formatDate } from '../../utils/utils.js';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axios.js';
import './TodoCard.css';

const TodoCard = ({ todo, setTodos }) => {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted || false);
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await axiosInstance.delete(`/todos/${todo._id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error(error.message);
    }
  };

  const handleCardClick = () => {
    navigate(`/todos/${todo._id}`);
  };

  return (
    <div 
      className={`card ${isCompleted ? 'completed' : ''}`} 
      onClick={handleCardClick}>
      <div className="card-content">
        <h3>{todo.title}</h3>
        <p>{todo.desc}</p>
        
        {/* Checkbox: doesn't trigger navigation */}
        <input
          type="checkbox"
          className="checkbox"
          checked={isCompleted}
          onChange={(e) => {
            e.stopPropagation();
            setIsCompleted(e.target.checked);
          }}
          onClick={(e) => e.stopPropagation()}
        />

        <div className="date">
          <span>{formatDate(new Date(todo.createdAt))}</span>
          <div className="updatedelete">
            <PenSquareIcon
              className="update-icon"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/todos/${todo._id}`);
              }}
            />
            <button
              className="delete-icon"
              onClick={(e) => handleDelete(e, todo._id)}
            >
              <Trash2Icon className="trash-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
