import express, { Express } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from "express-session";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app: Express = express();

// Подключение к MongoDB
mongoose.connect("mongodb://localhost:27017/leetcode_clone")
  .then(() => {
    console.log("Успешно подключено к MongoDB");
  })
  .catch((err) => {
    console.error("Ошибка подключения к MongoDB:", err);
  });

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
app.listen(3000, (): void => {
  console.log("Сервер запущен на порту 3000");
});
