import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Annonce } from 'src/app/models/annonce.model';
import { AnnonceService } from 'src/app/services/annonce.service';

@Component({
  selector: 'app-annonce-list',
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.css'],
})
export class AnnonceListComponent implements OnInit {
  annonces: Annonce[] = [];
  newAnnonce: Annonce = {
    id: 0,  // The ID should be initialized with a placeholder value like 0
    titre: '',
    localisation: '',
    category: '',  // Should be a string, e.g., 'vente' or 'location'
    price: 0,  // Should be a number (decimal), initialized with 0
    date: '',  // This can be an empty string initially, it will be set on save
    description: '',
    nombre_de_chambres: 0,  // Should be a number, initialize with 0
    surface: 0,  // Should be a number (decimal), initialize with 0
    image: '',  // The image URL or path should be an empty string initially
    equiped: false,  // Should be a boolean, initialize with false
    lease_duration: null,  // Can be null or a number, initialize with null
    is_negotiable: false,  // Should be a boolean, initialize with false
    is_occupied: 'no',  // Should be a string, initialize with 'no'
    owner: null,  // Should be a number (foreign key), initialize with null
  };
  filteredAnnonces: Annonce[] = [];
  selectedCategory: string = '';

  constructor(private annonceService: AnnonceService , private router : Router){}

  ngOnInit(): void {
    this.loadAnnonces();
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
      this.newAnnonce.price = parseFloat(this.newAnnonce.price.toString());  // Assurez-vous que 'price' est un nombre
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
  
}
