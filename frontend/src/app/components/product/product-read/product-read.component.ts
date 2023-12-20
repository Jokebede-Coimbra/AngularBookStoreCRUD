import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.scss']
})
export class ProductReadComponent implements OnInit{

  products: Product[] = [];
  displayedColumns = ['id', 'name', 'author', 'rating', 'price', 'file_name', 'action'];
  
  getStars(rating: number): number[] {
    // Gera uma matriz de estrelas com base no valor da avaliação
    return Array.from({ length: rating }, (_, index) => index);
  }
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products
      
    });

  }
}


