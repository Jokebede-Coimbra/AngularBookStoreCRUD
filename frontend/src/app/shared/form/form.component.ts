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

    this.imageConversionService.readFile(selectedFile).then(base64String => {
      this.form.get("filebase64")?.setValue(base64String);
      console.log('Base64 Encoded:', base64String);
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
