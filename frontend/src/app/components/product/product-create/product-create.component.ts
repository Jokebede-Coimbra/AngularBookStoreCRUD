import { Product } from "./../product.model";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.scss"],
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    name: "",
    author: "",
    rating: 4,
    price: 29.99,
    file_name: "",
    id: "",
  };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage("Produto criado com sucesso!");
      this.router.navigate(["/products"]);
    });
  }

  getFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.product.file_name = event.target.files[0];
    }
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
