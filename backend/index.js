import express from "express"
import dotenv from "dotenv"
import { connect } from "./utils/connectDb.js";
import todoRouter from "./routes/todo.route.js"
import authRoutes from "./routes/user.route.js"
import cors from "cors"

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res)=>{
  res.send("Hello from backend")
})

app.use("/api/todos", todoRouter)
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connect();
});