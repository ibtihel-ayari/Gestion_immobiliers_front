import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Annonce } from '../models/annonce.model';
import { AnnonceService } from '../services/annonce.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentaireService } from '../services/commentaire.service';

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
    private fb: FormBuilder
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