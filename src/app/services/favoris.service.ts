import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annonce } from '../models/annonce.model';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {
  private apiBaseUrl = 'http://localhost:8000/favorites';

  constructor(private http: HttpClient) {}


  getFavoritesByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/getfavorite/${userId}`);
  }

  addFavorite(favoriteData: { user_id: number; annonce_id: number }): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/create`, favoriteData);
  }

  removeFavorite(favoriteId: number): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/delete/${favoriteId}`, {});
  }
}