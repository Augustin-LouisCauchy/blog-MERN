import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { registerValidation } from "./validations/auth.js";
import UserModel from "./models/User.js";

mongoose
  .connect(
    "mongodb+srv://John_Smith:ORmaxE3rXq0lHeou@cluster0.pbjkzzl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const password = req.body.password   // Вытаскиваю пароль из body перед созданием документа (doc)
  const salt = await bcrypt.genSalt(10)  //генерация строки символов
  const passwordHash = await bcrypt.hash(password, salt) //шифрование пароля с помощью алгоритма salt

  const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    passwordHash: req.body.passwordHash,
  })

  res.json({
    success: true,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
