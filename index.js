import express, { json } from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation, postCreateValidation } from "./validation.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserContoller from "./controllers/UserContoller.js";
import * as PostContoller from "./controllers/PostController.js"

mongoose
  .connect(
    "mongodb+srv://John_Smith:ORmaxE3rXq0lHeou@cluster0.pbjkzzl.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidation, UserContoller.login);

app.post("/auth/register", registerValidation, UserContoller.register);

app.get("/auth/me", checkAuth, UserContoller.getMe);

//app.get("/posts", PostContoller.getAll);
//app.get("/post:id", PostContoller.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostContoller.create);
//app.delete("/posts", PostContoller.remove);
//app.patch("/post", PostContoller.update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
