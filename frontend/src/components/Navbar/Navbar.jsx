import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import './Navbar.css'

const Navbar = () => {
  return (
    <header className="header">
      <div className="title">
        <h1>Todo</h1>
      </div>
      <div className="create">
        <Link to={"/create"} className="btn">
            <PlusIcon className="icon" />
            <span>New Todo</span>
        </Link>
      </div>
    </header>
  );
};
export default Navbar;