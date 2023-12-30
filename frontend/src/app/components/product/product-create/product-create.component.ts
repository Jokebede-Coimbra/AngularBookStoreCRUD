import { Product } from "../model/product.model";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { ImageConversionService } from "../services/image.conversion.service";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.scss"],
})
export class ProductCreateComponent implements OnInit {
  product: Product | any;

  constructor(
    private productService: ProductService,
    private imageConversionService: ImageConversionService,
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

  getFile(event: any): void {
    console.log("Evento: ", event);
    const selectedFile = event.target.files[0];

    this.imageConversionService.convertImageToBase64(selectedFile).subscribe(
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
