import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../services/product.service";
import { Product } from "../model/product.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.scss"],
})
export class ProductUpdateComponent implements OnInit {
  product: Product | any;
  isAddMode = false;

  form: FormGroup = this.formBuilder.group({
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
      this.product = product;
      this.form.patchValue({
        id: product.id,
        name: product.name,
        author: product.author,
        rating: product.rating,
        price: product.price,
        fileName: product.fileName,
        filebase64: product.filebase64,
      });
    });
  }

  updateProduct(): void {
    this.productService.update(this.form.value).subscribe(() => {
      this.productService.showMessage("Produto atualizado com sucesso!");
      this.router.navigate(["/products"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
