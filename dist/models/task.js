import mongoose, { Schema } from "mongoose";
// Определение схемы для задачи
const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Экспорт модели
const Task = mongoose.model("Task", TaskSchema);
export default Task;
