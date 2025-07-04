import toast, { LoaderIcon } from 'react-hot-toast'
import {ArrowLeftIcon, Trash2Icon} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios.js'
import './TodosDetail.css'

const TodosDetail = () => {
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    const fetchTodo = async()=>{
      try {
        const res = await axiosInstance.get(`/todos/${id}`);
        setTodo(res.data);
        console.log(todo)
      } catch (error) {
        toast.error(error.message);
        console.log("Error in fetchTodo",error);
      } finally{
        setLoading(false);
      }
    }
    fetchTodo();
  }, [])

  const handleSave = async () => {
    if (!todo.title.trim() || !todo.desc.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await axiosInstance.put(`/todos/${id}`, todo);
      toast.success("Todo updated successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.log("Error in handleSave",error);
    } finally {
      setSaving(false);
    }
  }
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this todo?");
    if (!confirm) return;
    try {
      await axiosInstance.delete(`/todos/${id}`);
      toast.success("Todo deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.log("Error in handleDelete",error);
    }
  }
  
    if(loading){
      return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
          <LoaderIcon className="animate-spin size-10" />
        </div>
      );
    }
  return (
    <div className='TodoUpdate'>
      <div className="container">
        <div className="body">
          <div className="top-section">
            <Link to="/" className="back-btn">
              <ArrowLeftIcon className="ArrowLeftIcon" />
              Back to Todos
            </Link>
            <button 
              className='btn'
              onClick={handleDelete}
              >
              <Trash2Icon className="Trash-icon"  />
              Delete Todo
            </button>
          </div>

          <div className="main">
            <div className="main-body">
              <div className="title">
                <label className='label-title'>
                  <span className='span-title'>Title</span>
                </label>
                <input 
                  type="text" 
                  placeholder='Title'
                  className='input-title'
                  value={todo.title}
                  onChange={(e)=>setTodo({...todo, title:e.target.value})}
                />
              </div>
              <div className="description">
                <label className='label-description'>
                  <span className='span-description'>description</span>
                </label>
                <textarea  
                  placeholder='description'
                  className='input-description'
                  value={todo.desc}
                  onChange={(e)=>setTodo({...todo, desc:e.target.value})}
                />
              </div>

              <div className="btns">
                <button className='cancel-btn' onClick={()=>navigate("/")}>
                  Cancel
                </button>
                <button 
                  className='Save-btn' 
                  disabled={saving} 
                  onClick={handleSave}>
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodosDetail