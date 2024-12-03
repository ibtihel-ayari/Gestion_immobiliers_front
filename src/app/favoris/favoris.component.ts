import { Component, OnInit } from '@angular/core';
import { Annonce } from '../models/annonce.model';
import { AnnonceService } from '../services/annonce.service';
import { Route, Router } from '@angular/router';
import { FavorisService } from '../services/favoris.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  favorites: any[] = [];
  annonces: any[] = []; // Assume this gets loaded elsewhere or via another service
  currentUser: any;

  constructor(private favoritesService: FavorisService,private router : Router, private snackBar : MatSnackBar){}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.fetchFavorites();
  }
  showSnackbar(body: string): void {
    this.snackBar.open(body, 'Close', {
      duration: 3000, // milliseconds
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'bottom', // 'top' | 'bottom'
    });
  }
  loadCurrentUser(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    } else {
      console.error('No current user found in localStorage');
    }
  }
  goToDetails(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/details', id]);
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