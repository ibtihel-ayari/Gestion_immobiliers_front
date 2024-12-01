import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OccupationService {
  private baseUrl = 'http://localhost:8000/occupations'; // Adjust this to your backend API base URL

  constructor(private http: HttpClient) {}

  // Fetch occupations by annonce ID
  getOccupationsByAnnonce(annonceId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getallbyannonce/${annonceId}`);
  }

  // Accept occupation
  acceptOccupation(occupationId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/activate/${occupationId}`, {});
  }

  // Refuse occupation
  refuseOccupation(occupationId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/occupations/${occupationId}/refuse`, {});
  }
}