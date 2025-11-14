import express, { Request, Response, NextFunction } from "express";
import { login, logout, signUp, updateProfilePicture } from "../controllers/user.controller";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/user.validators";
import { validate } from "../validators/validate";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { upload } from "../middlewares/multer.middlwares";

const router = express.Router();

router.post("/register", userRegisterValidator(), validate, signUp);
router.post("/login", userLoginValidator(), validate, login);
router.post("/logout", logout);
router.patch("/profile-picture", verifyJWT, upload.single("avatar"), updateProfilePicture);

export default router;
