import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  
  private apiUrl = 'http://localhost:8000/api/predict-price/'; // Assurez-vous que l'URL correspond à votre configuration Django

  constructor(private http: HttpClient) {}

  predictPrice(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
