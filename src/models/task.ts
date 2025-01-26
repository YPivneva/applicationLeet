import mongoose, { Document, Schema } from "mongoose";

// Определение интерфейса для документа задачи
export interface TaskDocument extends Document {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Определение схемы для задачи
const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Экспорт модели
const Task = mongoose.model<TaskDocument>("Task", TaskSchema);
export default Task;