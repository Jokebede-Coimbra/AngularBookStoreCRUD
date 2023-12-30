import { Component, OnInit } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductService } from "../services/product.service";
import { ChangeDetectorRef } from "@angular/core";
import { ConfirmationDialogComponent } from "../../confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";

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
    private cdr: ChangeDetectorRef,  
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.productService.read().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(productId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover esse livro?",
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.productService.delete(productId).subscribe(() => {
          this.refreshTable();
          this.productService.showMessage("Produto excluído com sucesso!");
        });
      }
    });
  }

  refreshTable(): void {
    this.productService.read().subscribe((products) => {
      this.products = products;
      this.cdr.detectChanges();
    });
  }

}
