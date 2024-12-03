import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Annonce } from '../models/annonce.model';
import { AnnonceService } from '../services/annonce.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentaireService } from '../services/commentaire.service';
import { OccupationService } from '../services/occupation.service';
import { OccupationCreation } from '../models/occupation';
import { DatePipe } from '@angular/common';
import { Commentaire, create_comment } from '../models/comment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-annonce-details',
  templateUrl: './annonce-details.component.html',
  styleUrls: ['./annonce-details.component.css'],
})
export class AnnonceDetailsComponent implements OnInit {
  annonce!: Annonce;
  comments: Commentaire[] = [];
  commentForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private annonceService: AnnonceService, // Service to fetch annonce details
    private commentaireService: CommentaireService,
    private occupationService: OccupationService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
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
  showSnackbar(body: string): void {
    this.snackBar.open(body, 'Close', {
      duration: 3000, // milliseconds
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'bottom', // 'top' | 'bottom'
    });
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
      is_active: 'en attente',
    };
    console.log(JSON.stringify(newOccupation));
    this.occupationService.makeOccupation(newOccupation).subscribe({
      next: (response) => {
        this.showSnackbar('occupation crée');
      },
      error: (response) => {
        this.showSnackbar(JSON.stringify(response.error));
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
    this.commentaireService.getCommentairesByAnnonce(annonceId).subscribe({
      next: (response) => {
        this.comments = response;
      },
      error: () => {},
    });
  }

  onAddComment(): void {
    const id = this.route.snapshot.paramMap.get('id');

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.commentForm.valid) {
      const newComment: create_comment = {
        user_id: user.id,
        annonce_id: parseInt(id),
        contenu: this.commentForm.get('contenu').value,
      };

      this.commentaireService.ajouterCommentaire(newComment).subscribe({
        next: () => {
          this.showSnackbar('Commentaire ajouté');
          const id = this.route.snapshot.paramMap.get('id');
          this.fetchCommentaires(id);
        },
        error: () => {
          alert('error');
        },
      });
    }
  }
}
