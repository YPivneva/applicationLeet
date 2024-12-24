import mongoose, { Document } from "mongoose";
interface IUser extends Document {
    username: string;
    password: string;
    role: "user" | "admin" | "interviewer";
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
