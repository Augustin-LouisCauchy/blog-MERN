import express, { json } from "express";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserContoller from "./controllers/UserContoller.js";

mongoose
  .connect(
    "mongodb+srv://John_Smith:ORmaxE3rXq0lHeou@cluster0.pbjkzzl.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/login", UserContoller.login);

app.post("/auth/register", registerValidation, UserContoller.register);

app.get("/auth/me", checkAuth, UserContoller.getMe);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
