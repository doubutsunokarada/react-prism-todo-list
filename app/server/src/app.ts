import express from "express";
import cors from "cors";
import TodoController from "./controllers/TodoController";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// APIs
app.use("/todos", TodoController);

export default app;
