import { Link, useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import './Navbar.css'
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log("User in navbar:", user);


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="title">
        <h1>Todo</h1>
      </div>
      {user ? (
        <div className="create auth-buttons">
          <span className="greeting">Hello, <strong>{user.user.username}</strong></span>
          <Link to="/create" className="btn">
            <PlusIcon className="icon" />
            <span>New Todo</span>
          </Link>
          <button onClick={handleLogout} className="btn logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <div className="create auth-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
