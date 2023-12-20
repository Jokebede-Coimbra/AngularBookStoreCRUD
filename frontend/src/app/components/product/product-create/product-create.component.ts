import { Product } from "./../product.model";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.scss"],
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    name: '',
    author: '',
    rating: 4,
    price: 29.99,
    file_name: '',
    id: ""
  };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.product.file_name = file.name;
      // Você pode adicionar lógica adicional para processar o arquivo, se necessário.
    }
  }
  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage("Produto criado com sucesso!");
      this.router.navigate(["/products"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
