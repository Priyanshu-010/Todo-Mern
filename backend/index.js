import express from "express"
import dotenv from "dotenv"
import { connect } from "./utils/connectDb.js";
import todoRouter from "./routes/todo.route.js"
import authRoutes from "./routes/user.route.js"
import cors from "cors"
import path from "path"

dotenv.config();
const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// })

app.use("/api/todos", todoRouter)
app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connect();
});