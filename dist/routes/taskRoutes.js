import express from "express";
import Task from "../models/task.js";
const router = express.Router();
// Создание новой задачи
router.post("/", (req, res) => {
    const newTask = new Task(req.body);
    newTask
        .save()
        .then((task) => res.status(201).json(task))
        .catch((err) => res.status(400).json({ error: err.message }));
});
// Получение всех задач
router.get("/", (req, res) => {
    Task.find()
        .then((tasks) => res.status(200).json(tasks))
        .catch((err) => res.status(500).json({ error: err.message }));
});
// Обновление задачи по ID
router.put("/:id", (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((task) => res.status(200).json(task))
        .catch((err) => res.status(400).json({ error: err.message }));
});
// Удаление задачи по ID
router.delete("/:id", (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).json({ error: err.message }));
});
// Добавление комментария к задаче
router.post("/:id/comments", (req, res) => {
    const { user, comment } = req.body;
    Task.findByIdAndUpdate(req.params.id, { $push: { comments: { user, comment } } }, { new: true })
        .then((task) => res.status(200).json(task))
        .catch((err) => res.status(400).json({ error: err.message }));
});
// Оценка задачи
router.post("/:id/rate", (req, res) => {
    const { user, rating } = req.body;
    Task.findByIdAndUpdate(req.params.id, { $push: { ratings: { user, rating } } }, { new: true })
        .then((task) => res.status(200).json(task))
        .catch((err) => res.status(400).json({ error: err.message }));
});
export default router;
