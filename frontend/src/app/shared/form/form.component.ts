import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
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

  constructor(private imageConversionService: ImageConversionService) {}

  ngOnInit(): void {
    //this.product = {};
  }

  onSubmit(): void {
    this.submitForm.emit();
  }

  getFile(event: any): void {
    const selectedFile = event.target.files[0];

    this.imageConversionService.convertImageToBase64(selectedFile).subscribe(
      (base64String) => {
        // this.product.filebase64 = base64String;
        this.form.get("filebase64")?.setValue(base64String);
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
