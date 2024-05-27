import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("fullName").isLength({ min: 3 }),      // <--- валидация свойств
  body("avatarUrl").optional().isURL(),
];
