import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../product.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Product } from "../model/product.model";

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.scss"],
})
export class ProductDeleteComponent implements OnInit {
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
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];

      this.productService.readById(id).subscribe((product) => {
        this.productForm.patchValue(product);
      });
  }

  deleteProduct(productId: string): void {
    //const productId = this.productForm.value.id;

    this.productService.delete(productId).subscribe(() => {
      this.productService.showMessage("Produto excluído com sucesso!");
      this.router.navigate(["/products"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
