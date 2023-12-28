import { Product } from "../model/product.model";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";
import { Observable, switchMap } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.scss"],
})
export class ProductCreateComponent implements OnInit {
  product: Product | any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.product = this.formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      author: ["", Validators.required],
      rating: [, Validators.required],
      price: [, Validators.required],
      fileName: ["", Validators.required],
      filebase64: [""],
    });
  }

  createProduct(): void {
    this.productService.create(this.product.value).subscribe(() => {
      this.productService.showMessage("Produto criado com sucesso!");
      this.router.navigate(["/products"]);
    });
  }

  convertImageToBase64(file: File): Observable<string> {
    return new Observable<string>((observer) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        observer.next(reader.result as string);
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error(error);
      };

      reader.readAsDataURL(file);
    });
  }

  getFile(event: any): void {
    console.log("Evento: ", event);
    const selectedFile = event.target.files[0];

    this.convertImageToBase64(selectedFile).subscribe(
      (base64String) => {
        console.log("Teste2", base64String);
        this.product.get("filebase64")?.setValue(base64String);
        console.log("Teste4", base64String);
      },
      (error) => {
        console.error("Erro ao converter imagem para base64:", error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
