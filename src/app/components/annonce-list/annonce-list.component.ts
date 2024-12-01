import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Annonce } from 'src/app/models/annonce.model';
import { AnnonceService } from 'src/app/services/annonce.service';
import { FavorisService } from 'src/app/services/favoris.service';

@Component({
  selector: 'app-annonce-list',
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.css'],
})
export class AnnonceListComponent implements OnInit {
  annonces: Annonce[] = [];
  favorites: any[] = [];
  currentUser: any;

  newAnnonce: Annonce = {
    id: 0,  // The ID should be initialized with a placeholder value like 0
    titre: '',
    localisation: '',
    category: null,  // Should be a string, e.g., 'vente' or 'location'
    price: '',  // Should be a number (decimal), initialized with 0
    date: '',  // This can be an empty string initially, it will be set on save
    description: '',
    nombre_de_chambres: 0,  // Should be a number, initialize with 0
    surface: '',  // Should be a number (decimal), initialize with 0
    image: '',  // The image URL or path should be an empty string initially
    equiped: false,  // Should be a boolean, initialize with false
    lease_duration: null,  // Can be null or a number, initialize with null
    is_negotiable: '',  // Should be a boolean, initialize with false
    is_occupied: '',  // Should be a string, initialize with 'no'
    owner: null,  // Should be a number (foreign key), initialize with null
  };
  filteredAnnonces: Annonce[] = [];
  selectedCategory: string = '';

  constructor(private annonceService: AnnonceService , private favoritesService: FavorisService,private router : Router){}

  ngOnInit(): void {
    this.loadAnnonces();
    this.loadCurrentUser();
    this.fetchFavorites();
  }

  loadAnnonces() {
    this.annonceService.getAnnonces().subscribe(
      (data: Annonce[]) => {
        this.annonces = data;
        this.filteredAnnonces=data;
        console.log('Données des annonces reçues:', data); // Afficher les données dans la console
      },
      (error) => {
        console.error('Erreur lors du chargement des annonces', error);
      }
    );
  }
  goToDetails(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/details', id]);
    }
  }

  createAnnonce() {
    if (this.newAnnonce.price) {
      this.newAnnonce.price = (this.newAnnonce.price.toString());  
    }
    this.newAnnonce.date = new Date().toISOString(); // Génère la date actuelle
    this.annonceService.createAnnonce(this.newAnnonce).subscribe(
      (response) => {
        console.log('Annonce créée avec succès:', response); // Afficher la réponse du serveur
        this.loadAnnonces(); // Recharge la liste après création
      },
      (error) => {
        console.error("Erreur lors de la création de l'annonce", error);
      }
    );
  }
  // Filtrer les annonces par catégorie
  filterByCategory(): void {
    if (this.selectedCategory) {
      this.filteredAnnonces = this.annonces.filter(
        (annonce) => annonce.category === this.selectedCategory
      );
    } else {
      this.filteredAnnonces = this.annonces; // Afficher toutes les annonces si aucune catégorie n'est sélectionnée
    }
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
  toggleFavorite(annonce: any): void {
    const favorite = this.favorites.find(fav => fav.annonce.id === annonce.id);
    if (favorite) {
      this.removeFavorite(favorite.id);
    } else {
      this.addFavorite(annonce.id);
    }
  }
  isFavorite(annonceId: number): boolean {
    return this.favorites.some(fav => fav.annonce.id === annonceId);
  }
}