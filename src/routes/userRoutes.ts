import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Router } from "express";
import User from "../models/User.js";

const router: Router = Router();

// Регистрация нового пользователя
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const {
    username,
    password,
    role,
  }: { username: string; password: string; role?: string } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const hashedPassword: string = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    role: role || "user",
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Логин пользователя
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { username, password }: { username: string; password: string } =
    req.body;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(401).json({ message: "Authentication failed" });
    return;
  }

  const isMatch: boolean = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: "Authentication failed" });
    return;
  }

  req.session.userId = user._id;
  res.status(200).json({ message: "Login successful" });
});

// Выход пользователя
router.post("/logout", (req: Request, res: Response): void => {
  req.session.destroy((err: any) => {
    if (err) {
      res.status(500).json({ message: "Could not log out" });
      return;
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

// Получение информации о пользователе
router.get("/me", async (req: Request, res: Response): Promise<void> => {
  if (!req.session.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const user = await User.findById(req.session.userId).select("-password");
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json(user);
});

// Изменение пароля
router.put(
  "/change-password",
  async (req: Request, res: Response): Promise<void> => {
    const {
      oldPassword,
      newPassword,
    }: { oldPassword: string; newPassword: string } = req.body;

    const user = await User.findById(req.session.userId);
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const isMatch: boolean = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Old password is incorrect" });
      return;
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  },
);

export default router;
