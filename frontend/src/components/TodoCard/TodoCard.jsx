import {formatDate} from '../../utils/utils.js'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link } from 'react-router'
import axiosInstance from '../../utils/axios.js'
import './TodoCard.css'

const TodoCard = ({todo, setTodos}) => {

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await axiosInstance.delete(`/todos/${todo._id}`)
      setTodos((prev) => prev.filter((todo)=> todo.id !== id)) // It will return 
      // id (id of every todo contained in prev) of todo which is not equal to the id (id in params) of the given Todd
    } catch (error) {
      console.log("Error in handleDelete",error);
      toast.error(error.message)
    }
  }
  return (
    <Link to={`/todos/${todo._id}`} className='card'>
      <div className='card-content'>
        <h3>{todo.title}</h3>
        <p>{todo.desc}</p>
        <div className="date">
          <span>{formatDate(new Date(todo.createdAt))}</span>
            <div className="updatedelete">
              <PenSquareIcon className='update-icon'/>
              <button 
                className='delete-icon' 
                onClick={(e)=> handleDelete(e, todo._id)}>
                <Trash2Icon className='trash-icon'/>
              </button>
            </div>
        </div>
      </div>
    </Link>
  )
}

export default TodoCard