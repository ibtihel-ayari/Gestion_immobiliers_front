import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OccupationCreation } from '../models/occupation';

@Injectable({
  providedIn: 'root'
})
export class OccupationService {
  private apiUrl = 'http://localhost:8000/occupations'; // Adjust this to your backend API base URL

  constructor(private http: HttpClient) {}

  getOccupationsByOwner(ownerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/owner/${ownerId}/`);
  }

  acceptOccupation(id: number,status: string ): Observable<any> {
    return this.http.post(`${this.apiUrl}/activate/${id}/status/${status}`, {});
  }

  refuseOccupation(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/refuse/${id}/`, {}); // Placeholder, adjust as per backend
  }
  makeOccupation(occupation: OccupationCreation): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/create', occupation);
  }
}