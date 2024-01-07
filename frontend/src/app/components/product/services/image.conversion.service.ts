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
        if (reader.result) {
          observer.next(reader.result as string);
          observer.complete();
        } else {
          observer.error("Failed to read the file.");
        }
      };

      reader.onerror = (error) => {
        observer.error(error);
      };

      reader.readAsDataURL(file);
    });
  }
}
