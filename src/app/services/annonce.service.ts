import { Injectable } from '@angular/core';
import { Annonce } from '../models/annonce.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AnnonceCreation } from '../models/create-annoce';

@Injectable({
  providedIn: 'root',
})
export class AnnonceService {
  private apiUrl = 'http://localhost:8000/annonce';
  private apiUrlget = 'http://127.0.0.1:8000/annonce/getall';

  constructor(private http: HttpClient) {}

  getAnnonces(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiUrlget}`);
  }

  createAnnonce(annonce: AnnonceCreation): Observable<Annonce> {
    return this.http.post<any>(`${this.apiUrl}/create`, annonce);
  }
}
