import express, { Request, Response } from "express";
import Task, {TaskDocument} from "../models/task.js";

const router = express.Router();

// Создание новой задачи
router.post("/", (req: Request, res: Response): void => {
  const newTask: TaskDocument = new Task(req.body);
  newTask
    .save()
    .then((task) => res.status(201).json(task))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Получение всех задач
router.get("/", (req: Request, res: Response): void => {
  Task.find()
    .then((tasks) => res.status(200).json(tasks))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Обновление задачи по ID
router.put("/:id", (req: Request, res: Response): void => {
  Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((task) => res.status(200).json(task))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Удаление задачи по ID
router.delete("/:id", (req: Request, res: Response): void => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).send())
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Добавление комментария к задаче
router.post("/:id/comments", (req: Request, res: Response): void => {
  const { user, comment } = req.body;
  Task.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: { user, comment } } },
    { new: true },
  )
    .then((task) => res.status(200).json(task))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Оценка задачи
router.post("/:id/rate", (req: Request, res: Response): void => {
  const { user, rating } = req.body;
  Task.findByIdAndUpdate(
    req.params.id,
    { $push: { ratings: { user, rating } } },
    { new: true },
  )
    .then((task) => res.status(200).json(task))
    .catch((err) => res.status(400).json({ error: err.message }));
});

export default router;
