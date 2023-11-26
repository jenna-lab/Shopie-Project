import { Request } from "express";

export interface Product {
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
}
