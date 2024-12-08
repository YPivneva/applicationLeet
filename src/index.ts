import express, { Express } from "express";
// import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from "express-session";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { Request, Response } from "express";
import ds from "./config/data-source.js";
import { Users } from "./db/entities/users.entity.js";
import { Task } from "./db/entities/task.entity.js";

const app: Express = express();
app.use(express.json());

ds.initialize().then(()=>{
  console.log('database is ready');
});

app.get("/users",async(req: Request, res: Response)=>{
  const repo = ds.getRepository(Users);
  const usersData = await repo.find();

  res.send(usersData);
});

app.get("/users/:id",async(req: Request, res: Response)=>{
  const repo = ds.getRepository(Users);
  const id = parseInt(req.params.id);
  const users = (await repo.findOneBy({id}));

  res.send(users);
});

app.get("/task",async(req: Request, res: Response)=>{
  const repo = ds.getRepository(Task);
  const taskData = await repo.find();

  res.send(taskData);
});

app.get("/task/:id",async(req: Request, res: Response)=>{
  const repo = ds.getRepository(Task);
  const id = parseInt(req.params.id);
  const task = (await repo.findOneBy({id}));

  res.send(task);
});

app.get("/task/byMask/:mask",async(req: Request, res: Response)=>{
  const repo = ds.getRepository(Task);
  const mask = req.params.mask;
  const task = await repo.find({
    where: {title: mask},
  });
  
  res.send(task);
});

// Подключение к MongoDB
// mongoose.connect("mongodb://localhost:27017/leetcode_clone")
//   .then(() => {
//     console.log("Успешно подключено к MongoDB");
//   })
//   .catch((err) => {
//     console.error("Ошибка подключения к MongoDB:", err);
//   });

// Middleware
app.use(bodyParser.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  }),
);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Запуск сервера
app.listen(3001, (): void => {
  console.log("Сервер запущен на порту 3001");
});
