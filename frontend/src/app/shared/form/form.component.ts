import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Product } from "src/app/components/product/model/product.model";
import { ImageConversionService } from "src/app/components/product/services/image.conversion.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent {
  @Input() form!: FormGroup;
  @Input() isAddMode!: boolean;
  @Output() submitForm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();


  constructor(
    private imageConversionService: ImageConversionService
  ) {}

  ngOnInit(): void {
    //this.product = {};
  }

  onSubmit(): void {
    this.submitForm.emit();
  }

  getFile(event: any): void {
    console.log("Evento: ", event);
    const selectedFile = event.target.files[0];

    this.imageConversionService.convertImageToBase64(selectedFile).subscribe(
      (base64String) => {
        console.log("Teste2", base64String);
        // this.product.filebase64 = base64String;
        this.form.get("filebase64")?.setValue(base64String);
        console.log("Teste4", base64String);
      },
      (error) => {
        console.error("Erro ao converter imagem para base64:", error);
      }
    );
  }
  onCancel(): void {
    this.cancel.emit();
  }
}
