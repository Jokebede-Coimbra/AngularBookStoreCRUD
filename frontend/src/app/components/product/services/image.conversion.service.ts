import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImageConversionService {
  constructor() {}

  // convertImageToBase64(file: File): Observable<string> {
  //   return new Observable<string>((observer) => {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       if (reader.result) {
  //         observer.next(reader.result as string);
  //         observer.complete();
  //       } else {
  //         observer.error("Failed to read the file.");
  //       }
  //     };

  //     reader.onerror = (error) => {
  //       observer.error(error);
  //     };

  //     reader.readAsDataURL(file);
  //   });
  
  convertImageToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject("Failed to read the file.");
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }
  readFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64String: string = btoa(reader.result as string);
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsBinaryString(file);
    });
  }


  
}
