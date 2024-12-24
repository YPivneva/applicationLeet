var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import { Router } from "express";
import User from "../models/User.js";
const router = Router();
// Регистрация нового пользователя
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role, } = req.body;
    const existingUser = yield User.findOne({ username });
    if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
    }
    const hashedPassword = yield bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        password: hashedPassword,
        role: role || "user",
    });
    try {
        yield newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Логин пользователя
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield User.findOne({ username });
    if (!user) {
        res.status(401).json({ message: "Authentication failed" });
        return;
    }
    const isMatch = yield bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401).json({ message: "Authentication failed" });
        return;
    }
    req.session.userId = user._id;
    res.status(200).json({ message: "Login successful" });
}));
// Выход пользователя
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ message: "Could not log out" });
            return;
        }
        res.status(200).json({ message: "Logout successful" });
    });
});
// Получение информации о пользователе
router.get("/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const user = yield User.findById(req.session.userId).select("-password");
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.status(200).json(user);
}));
// Изменение пароля
router.put("/change-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword, } = req.body;
    const user = yield User.findById(req.session.userId);
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const isMatch = yield bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        res.status(401).json({ message: "Old password is incorrect" });
        return;
    }
    user.password = yield bcrypt.hash(newPassword, 10);
    yield user.save();
    res.status(200).json({ message: "Password changed successfully" });
}));
export default router;
