const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const taskRoutes = require("./routes/tasks");
const app = express();
const PORT = process.env.PORT || 3000;
// Подключение к MongoDB
mongoose.connect("mongodb://localhost:27017/task-manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Middleware
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
