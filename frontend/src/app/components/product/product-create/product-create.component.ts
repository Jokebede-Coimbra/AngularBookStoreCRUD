import { Product } from "../model/product.model";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ImageConversionService } from "../services/image.conversion.service";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.scss"],
})
export class ProductCreateComponent implements OnInit {
  // product: Product | any;
  form!: FormGroup;
  isAddMode = true;
  
  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Id: [""],
      name: ["", Validators.required],
      author: ["", Validators.required],
      rating: [, Validators.required],
      price: [, Validators.required],
      fileName: ["", Validators.required],
      filebase64: [""],
    });
  }

  onSubmit(): void {
    console.log("Formulário antes do envio:", this.form.value);

    this.productService.create(this.form.value).subscribe(() => {
      this.productService.showMessage('Produto criado com sucesso!');
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
