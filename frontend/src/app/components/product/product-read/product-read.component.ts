import { Component, OnInit } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductService } from "../product.service";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-product-read",
  templateUrl: "./product-read.component.html",
  styleUrls: ["./product-read.component.scss"],
})
export class ProductReadComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = [
    "id",
    "name",
    "author",
    "rating",
    "price",
    "fileName",
    "action",
  ];

  getStars(rating: number): any[] {
    const maxStars = 5;
    const roundedRating = Math.min(Math.max(Math.round(rating), 1), maxStars);
    return Array(roundedRating).fill(0);
  }

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productService.read().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(productId: string): void {
    this.productService.delete(productId).subscribe(() => {
      this.refreshTable();
      this.productService.showMessage("Produto excluído com sucesso!");
    });
  }

  refreshTable(): void {
    this.productService.read().subscribe((products) => {
      this.products = products;
      this.cdr.detectChanges();
    });
  }
}
