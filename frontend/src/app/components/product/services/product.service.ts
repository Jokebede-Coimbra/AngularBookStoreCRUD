import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Product } from "../model/product.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseApi = "https://ueef70w2n5.execute-api.sa-east-1.amazonaws.com/dev/";
  // baseApi = "http://localhost:3600/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string) {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseApi, product);
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseApi);
  }

  readById(id: string): Observable<Product> {
    //const api = `${this.baseApi}products/${id}`;
    const api = `${this.baseApi}/${id}`;
    return this.http.get<Product>(api);
  }

   //local
  update(product: Product): Observable<Product> {
     const api = `${this.baseApi}/${product.id}`;
      return this.http.put<Product>(api, product);
    }

  // API
  // update(product: Product): Observable<Product> {
  //   const api = `${this.baseApi}`;
  //   return this.http.put<Product>(api, product);
  // }

  delete(id: string): Observable<Product> {
    const api = `${this.baseApi}/${id}`;
    return this.http.delete<Product>(api);
  }
}
