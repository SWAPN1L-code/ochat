import { Request } from "express";
import User from "../database/model/User";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export interface ProtectedRequest extends Request {}
