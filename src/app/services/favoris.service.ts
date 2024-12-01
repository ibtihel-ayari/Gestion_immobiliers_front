import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annonce } from '../models/annonce.model';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {
  private baseUrl = 'http://localhost:8000/favorites';

  constructor(private http: HttpClient) {}

  getFavoritesByUser(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getfavorite/${userId}`);
  }

  createFavorite(data: { user_id: number; annonce_id: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  deleteFavorite(favoriteId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/delete/${favoriteId}`, {});
  }

  getAnnonces(): Observable<any> {
    return this.http.get('http://localhost:8000/annonces'); // Assuming this endpoint exists
  }
}