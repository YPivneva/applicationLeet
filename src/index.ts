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
// import { Task } from "./db/entities/task.entity.js";

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
app.get("/users", async (req: Request, res: Response) => {
  try {
    const repo = ds.getRepository(Users);
    const usersData = await repo.find();
    res.json(usersData);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
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
