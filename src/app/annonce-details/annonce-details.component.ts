import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Annonce } from '../models/annonce.model';
import { AnnonceService } from '../services/annonce.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentaireService } from '../services/commentaire.service';
import { OccupationService } from '../services/occupation.service';
import { OccupationCreation } from '../models/occupation';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-annonce-details',
  templateUrl: './annonce-details.component.html',
  styleUrls: ['./annonce-details.component.css'],
})
export class AnnonceDetailsComponent implements OnInit {
  annonce!: Annonce;
  comments: any[] = []; // Liste des commentaires
  commentForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private annonceService: AnnonceService, // Service to fetch annonce details
    private commentaireService: CommentaireService,
    private occupationService: OccupationService,
    private fb: FormBuilder, private datePipe: DatePipe
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadAnnonces(id);
    this.initForm();
    this.fetchCommentaires(id);
  }
  loadAnnonces(id) {
    this.annonceService.getAnnonces().subscribe(
      (data: Annonce[]) => {
        this.annonce = data.find((a) => a.id == id)!;
        console.log('Données des annonces reçues:', data); // Afficher les données dans la console
      },
      (error) => {
        console.error('Erreur lors du chargement des annonces', error);
      }
    );
  }



  formatDate(date: Date | null): string | null {
    if (!date) return null;
    return this.datePipe.transform(date, 'yyyy-MM-dd'); // Format the date to YYYY-MM-DD
  }

  makeoccupation(): void {
    const date = new Date();
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const newOccupation: OccupationCreation = {
      owner: this.annonce.owner.id,
      client: user.id,
      annonce: this.annonce.id,
      occupation_type: this.annonce.category,
      start_date: this.formatDate(date),
      end_date: null,
      is_active: "en attente",
    };
    console.log(JSON.stringify(newOccupation));
    this.occupationService.makeOccupation(newOccupation).subscribe({
      next: (response) => {
        alert(JSON.stringify(response));
      },
    });
  }







  initForm(): void {
    this.commentForm = this.fb.group({
      contenu: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  fetchCommentaires(id): void {
    const annonceId = id;
    this.commentaireService.getCommentairesByAnnonce(annonceId).subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des commentaires:', error);
      }
    );
  }

  onAddComment(): void {
    if (this.commentForm.valid) {
      const newComment = {
        contenu: this.commentForm.value.contenu,
        annonce: this.annonce.id,
        user: 1, // Remplacez par l'ID de l'utilisateur connecté
      };

      this.commentaireService.ajouterCommentaire(newComment).subscribe(
        (data) => {
          this.comments.push(data);
          this.commentForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l’ajout du commentaire:', error);
        }
      );
    }

  }}