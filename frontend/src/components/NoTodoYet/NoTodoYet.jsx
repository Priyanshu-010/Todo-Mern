import { NotebookIcon } from "lucide-react";
import { Link } from "react-router-dom";
import "./NoTodoYet.css"

const NoTodoYet = () => {
  return (
    <div className="no-todos">
      <div className="icon">
        <NotebookIcon className="notebook-icon"/>
      </div>
      <h3 className="title">No todos yet</h3>
      <p className="description">
        Ready to organize your thoughts? Create your first todo to get started on your journey.
      </p>
      <Link to="/create" className="btn">
        Create Your First Todo
      </Link>
    </div>
  );
}

export default NoTodoYet