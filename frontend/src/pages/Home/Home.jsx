import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import axiosInstance from "../../utils/axios.js";
import TodoCard from "../../components/TodoCard/TodoCard.jsx";
import NoTodoYet from "../../components/NoTodoYet/NoTodoYet.jsx";
import "./Home.css";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true); // Start with true

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axiosInstance.get("/todos");
        setTodos(res.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="home-container">
      <Navbar />

      {loading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : todos.length === 0 ? (
        <NoTodoYet />
      ) : (
        <div className="Todos">
          {todos.map((todo) => (
            <TodoCard key={todo._id} todo={todo} setTodos={setTodos} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
