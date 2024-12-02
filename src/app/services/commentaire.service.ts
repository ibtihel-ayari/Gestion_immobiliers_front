import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private baseUrl = 'http://127.0.0.1:8000/commentaires/'; // URL de l'API

  constructor(private http: HttpClient) { }

  getCommentairesByAnnonce(annonceId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getall/${annonceId}`);
  }

  ajouterCommentaire(contenu: any): Observable<any> {
    return this.http.post(this.baseUrl, contenu);
  }


}
