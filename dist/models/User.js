import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin", "interviewer"],
        default: "user",
    },
}, {
    timestamps: true,
});
const User = mongoose.model("User", userSchema);
export default User;
