import { Component, OnInit } from '@angular/core';
import { Annonce } from '../models/annonce.model';
import { AnnonceService } from '../services/annonce.service';
import { Router } from '@angular/router';
import { FavorisService } from '../services/favoris.service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  favorites: any[] = [];
  annonces: any[] = [];    // Assuming you fetch all annonces for toggling favorites
  userId = 1;             // Replace with the current logged-in user ID

  constructor(private favorisService: FavorisService) {}

  ngOnInit(): void {
    this.getFavorites();
    this.getAnnonces();
  }

  getFavorites(): void {
    this.favorisService.getFavoritesByUser(this.userId).subscribe({
      next: (response) => {
        this.favorites = response;
      },
      error: (err) => console.error('Error fetching favorites', err),
    });
  }

  getAnnonces(): void {
    this.favorisService.getAnnonces().subscribe({
      next: (response) => {
        this.annonces = response;
      },
      error: (err) => console.error('Error fetching annonces', err),
    });
  }

  toggleFavorite(annonce: any): void {
    const favorite = this.favorites.find((f) => f.annonce.id === annonce.id);

    if (favorite) {
      this.removeFavorite(favorite.id);
    } else {
      this.addFavorite(annonce.id);
    }
  }

  addFavorite(annonceId: number): void {
    const favoriteData = { user_id: this.userId, annonce_id: annonceId };
    this.favorisService.createFavorite(favoriteData).subscribe({
      next: (response) => {
        this.favorites.push(response.favorite);
      },
      error: (err) => console.error('Error adding favorite', err),
    });
  }

  removeFavorite(favoriteId: number): void {
    this.favorisService.deleteFavorite(favoriteId).subscribe({
      next: () => {
        this.favorites = this.favorites.filter((fav) => fav.id !== favoriteId);
      },
      error: (err) => console.error('Error removing favorite', err),
    });
  }

  isFavorite(annonceId: number): boolean {
    return this.favorites.some((fav) => fav.annonce.id === annonceId);
  }
}