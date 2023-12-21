import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  baseApi2 = 'http://localhost:3600/products'
  baseApi = 'http://18.231.125.57/products'
  

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string) {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }  

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseApi2, product)
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApi2)
  }

  readById(id: string): Observable<Product> {
    const api = `${this.baseApi2}/${id}`
    return this.http.get<Product>(api);
  }

  update(product:Product): Observable<Product> {
    const api = `${this.baseApi2}/${product.id}`
    return this.http.put<Product>(api, product);
  }

  delete(id: string): Observable<Product> {
    const api = `${this.baseApi2}/${id}`
    return this.http.delete<Product>(api);

  }
}