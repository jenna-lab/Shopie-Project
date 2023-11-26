import { Request } from "express";

export interface CartItem {
  productId: string;
  quantity: number;
}
