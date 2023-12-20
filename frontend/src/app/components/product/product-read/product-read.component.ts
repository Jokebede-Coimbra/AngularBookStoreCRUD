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

  
  getStars(rating: number): any[] {
    const maxStars = 5;
    const roundedRating = Math.min(Math.max(Math.round(rating), 1), maxStars);
    return Array(roundedRating).fill(0);
  }
  
  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products
      
    });

  }

}


