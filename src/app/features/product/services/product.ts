import { inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Product } from '../models/product';

const http = () => inject(HttpClient);
const base = environment.apiBaseUrl; 

export const ProductApi = {
  // GET /products
  getProducts(): Observable<Product[]> {
    return http().get<Product[]>(`${base}/products`).pipe(catchError(handle));
  },

  // GET /products/:id
  getProduct(id: number): Observable<Product> {
    return http().get<Product>(`${base}/products/${id}`).pipe(catchError(handle));
  },

  // GET /products/categories
  getCategories(): Observable<string[]> {
    return http().get<string[]>(`${base}/products/categories`).pipe(catchError(handle));
  },

  // GET /products/category/:name
  getByCategory(name: string): Observable<Product[]> {
    const encoded = encodeURIComponent(name);
    return http().get<Product[]>(`${base}/products/category/${encoded}`).pipe(catchError(handle));
  },
};

function handle(err: unknown) {
  let message = 'Something went wrong';
  if (err && typeof err === 'object' && 'message' in (err as any)) {
    message = (err as any).message as string;
  }
  if (err instanceof HttpErrorResponse && err.status) {
    message = `${err.status} ${err.statusText || ''}`.trim();
  }
  console.error('[ProductApi]', err);
  return throwError(() => new Error(message));
}
