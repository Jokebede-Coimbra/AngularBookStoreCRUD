import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImageConversionService {

  constructor() {}

  convertImageToBase64(file: File): Observable<string> {
    return new Observable<string>((observer) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        observer.next(reader.result as string);
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error(error);
      };

      reader.readAsDataURL(file);
    });
  }
}
