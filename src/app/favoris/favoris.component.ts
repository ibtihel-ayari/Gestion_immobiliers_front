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
  annonces: any[] = []; // Assume this gets loaded elsewhere or via another service
  currentUser: any;

  constructor(private favoritesService: FavorisService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.fetchFavorites();
  }

  loadCurrentUser(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    } else {
      console.error('No current user found in localStorage');
    }
  }

  fetchFavorites(): void {
    if (this.currentUser && this.currentUser.id) {
      this.favoritesService.getFavoritesByUser(this.currentUser.id).subscribe(
        (data) => {
          this.favorites = data;
        },
        (error) => {
          console.error('Error fetching favorites:', error);
        }
      );
    }
  }

  toggleFavorite(annonce: any): void {
    const favorite = this.favorites.find(fav => fav.annonce.id === annonce.id);
    if (favorite) {
      this.removeFavorite(favorite.id);
    } else {
      this.addFavorite(annonce.id);
    }
  }

  addFavorite(annonceId: number): void {
    const favoriteData = {
      user_id: this.currentUser.id,
      annonce_id: annonceId
    };
    this.favoritesService.addFavorite(favoriteData).subscribe(
      (response) => {
        console.log('Favorite added:', response);
        this.fetchFavorites();
      },
      (error) => {
        console.error('Error adding favorite:', error);
      }
    );
  }

  removeFavorite(favoriteId: number): void {
    this.favoritesService.removeFavorite(favoriteId).subscribe(
      (response) => {
        console.log('Favorite removed:', response);
        this.fetchFavorites();
      },
      (error) => {
        console.error('Error removing favorite:', error);
      }
    );
  }

  isFavorite(annonceId: number): boolean {
    return this.favorites.some(fav => fav.annonce.id === annonceId);
  }
}