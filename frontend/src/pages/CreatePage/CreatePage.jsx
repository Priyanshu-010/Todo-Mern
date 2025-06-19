import { Link, useNavigate } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import axiosInstance from '../../utils/axios.js'
import { useState } from 'react'
import './CreatePage.css'

const CreatePage = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!title.trim() || !desc.trim()){
      toast.error("All fields are required");
      return
    }

    setLoading(true);
    try {
      await axiosInstance.post("/todos", {title, desc});
      toast.success("Todo created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.log("Error in handleSubmit",error);
    } finally{
      setLoading(false);
    }
    console.log(title, desc)
  }

  return (
    <div className='create-page'>
      <div className="container">
        <div className="body">
          <Link to={'/'}>
            <ArrowLeftIcon className='arrow-icon'/>
            Back to Home
          </Link>

          <div className="card">
            <div className="card-body">
              <h2>Create New Todo</h2>
              <form onSubmit={handleSubmit}>
                <div className="title">
                  <label className='label-title'>
                    <span className='span-title'>Title</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder='Title'
                    className='input-title'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                  />
                </div>
                <div className="desc">
                  <label className='label-desc'>
                    <span className='span-desc'>Description</span>
                  </label>
                  <textarea
                    placeholder='Description related to todo'
                    className='input-desc'
                    value={desc}
                    onChange={(e)=>setDesc(e.target.value)}
                  />
                </div>
                {/* <div className="checkbox">
                  <input 
                    type="checkbox" 
                    className='input-checkbox'
                    checked={isCompleted}
                    onChange={(e)=>setIsCompleted(e.target.checked)}
                  />
                </div> */}
                <div className="submit-btn">
                  <button type='submit' className='btn' disabled={loading}>
                    {loading ? "Creating..." : "Create Todo"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage