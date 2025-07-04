import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axios.js';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Login data:", email, password);
      const res = await axiosInstance.post("/auth/login", {email, password})
      login(res.data);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.log(error, "error in login");
    }
  }
  return (
    <div className='auth-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        <input 
          type="password" 
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Login</button>
      </form>
      <Link to="/register">Don't have an account? Register</Link>
    </div>
  )
}

export default Login