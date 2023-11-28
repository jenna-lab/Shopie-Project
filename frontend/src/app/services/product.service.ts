import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:4700';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  createProduct(product: Product): Observable<any> {
    return this.http.post(`${this.baseUrl}/productRoute/add`, product, { headers: this.headers });
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/productRoute/allProducts`, { headers: this.headers });
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/productRoute/viewOneProduct/${productId}`, { headers: this.headers }).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => 'Product not found');
        }
        return throwError(() => 'Error fetching product by ID');
      })
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${productId}`, { headers: this.headers });
  }

  updateProduct(productId: string, product: Product): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${productId}`, product, { headers: this.headers });
  }

  viewAllProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/allProducts`, { headers: this.headers });
  }

  viewProductsCategory(category: string): Observable<Product[]> {
    const params = new HttpParams().set('productCategory', category);
    return this.http.get<Product[]>(`${this.baseUrl}/allProducts`, { params });
  }

}
