import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const concatFormToMessage = (formValues: {[key: string]: string}): string => {
  let message = 'Hello! We have new form!\n';

  // tslint:disable-next-line:forin
  for (const key in formValues) {
    message = message + `${key}: ${formValues[key]}\n`;
  }

  return message;
};

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  constructor(
    private http: HttpClient
  ) {
  }

  sendForm(formId: string, formValues: {[key: string]: string}): Observable<any> {
    const headers = new HttpHeaders({Accept: 'application/json'});
    const body = {
      email: 'test.visitor@email.com',
      message: concatFormToMessage(formValues)
    };

    return this.http.post(`https://formspree.io/f/${formId}`, body, { headers });
  }
}
