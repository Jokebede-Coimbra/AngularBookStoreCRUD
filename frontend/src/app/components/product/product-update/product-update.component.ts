import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../services/product.service";
import { Product } from "../model/product.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ImageConversionService } from "../services/image.conversion.service";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.scss"],
})
export class ProductUpdateComponent implements OnInit {
  product: Product | any;

  productForm: FormGroup = this.formBuilder.group({
    id: [""],
    name: ["", Validators.required],
    author: ["", Validators.required],
    rating: [, Validators.required],
    price: [, Validators.required],
    fileName: ["", Validators.required],
    filebase64: [""],
  });

  constructor(
    private productService: ProductService,
    private imageConversionService: ImageConversionService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];

    this.productService.readById(id).subscribe((product) => {
      this.product = product;
      this.productForm.patchValue({
        id: product.id,
        name: product.name,
        author: product.author,
        rating: product.rating,
        price: product.price,
        fileName: product.fileName,
        filebase64: product.filebase64
      });
    });
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage("Produto atualizado com sucesso!");
      this.router.navigate(["/products"]);
    });
  }

  getFile(event: any): void {
    console.log("Evento: ", event);
    const selectedFile = event.target.files[0];

    this.imageConversionService.convertImageToBase64(selectedFile).subscribe(
      (base64String) => {
        console.log("Teste2", base64String);
        this.productForm.get("filebase64")?.setValue(base64String);
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
