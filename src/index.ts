import express, { Express, Request, Response } from "express";
// import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import ds from "./config/data-source.js";
import { Users } from "./db/entities/users.entity.js";
import { Task } from "./db/entities/task.entity.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  }),
);


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Initialize database
ds.initialize()
  .then(() => {
    console.log("Database is ready");
  })
  .catch((err) => {
    console.error("Error initializing database:", err);
  });

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Direct database routes with error handling
app.get("/users", async (_: Request, res: Response) => {
  try {
    const repo = ds.getRepository(Users);
    const usersData = await repo.find();
    res.json(usersData);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params["id"] ? parseInt(req.params["id"]) : undefined;
    if (!id) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }

    const repo = ds.getRepository(Users);
    const user = await repo.findOneBy({ userid: id });
    
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.get("/task", async (_: Request, res: Response) => {
  try {
    const repo = ds.getRepository(Task);
    const taskData = await repo.find();
    res.json(taskData);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.get("/task/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params["id"] ? parseInt(req.params["id"]) : undefined;
    if (!id) {
      res.status(400).json({ error: "Invalid task ID" });
      return;
    }

    const repo = ds.getRepository(Task);
    const task = await repo.findOneBy({ id_list: id });
    
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    
    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

app.get("/task/byMask/:mask", async (req: Request, res: Response) => {
  try {
    const mask = req.params["mask"];
    if (!mask) {
      res.status(400).json({ error: "Invalid mask" });
      return;
    }

    const repo = ds.getRepository(Task);
    const tasks = await repo.find({
      where: { title: mask },
    });
    res.json(tasks);
  } catch (error) {
    console.error("Error searching tasks:", error);
    res.status(500).json({ error: "Failed to search tasks" });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, _: any) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Запуск сервера
app.listen(3001, (): void => {
  console.log("Сервер запущен на порту 3001");
});
