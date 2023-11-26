import { Request } from "express";

export interface User {
  username: string;
  userEmail: string;
  userPassword: string;
}
