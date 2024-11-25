import mongoose, { Document } from "mongoose";
export interface TaskDocument extends Document {
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const Task: mongoose.Model<TaskDocument, {}, {}, {}, mongoose.Document<unknown, {}, TaskDocument> & TaskDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Task;
