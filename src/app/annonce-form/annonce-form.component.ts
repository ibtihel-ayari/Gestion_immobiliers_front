// annonce-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnonceService } from '../services/annonce.service';
import { AnnonceCreation } from '../models/create-annoce';
import { PredictionService } from '../services/prediction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annonce-form',
  templateUrl: './annonce-form.component.html',
})
export class AnnonceFormComponent implements OnInit {
  predictedPrice: number | string = '';

  annonceForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private annonceService: AnnonceService,
    private predictionService: PredictionService,
    private snackBar: MatSnackBar, 
    private router : Router 
  ) {
    this.annonceForm = this.fb.group({
      id: [null],
      titre: ['', Validators.required],
      localisation: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: ['', Validators.required],
      nombre_de_chambres: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      surface: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      date: ['', [Validators.required]],
      image: ['', [Validators.required]],
      is_occupied: [false],
    });
  }
  setprice(string: string) {
    this.annonceForm.patchValue({
      price: 1200,
    });
  }
  ngOnInit(): void {}
  showSnackbar(): void {
    this.snackBar.open('annonce creé', 'Close', {
      duration: 3000, // milliseconds
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'bottom', // 'top' | 'bottom'
    });
  }

  // Function to submit the form data
  onSubmit() {
    if (this.annonceForm.valid) {
      const user = JSON.parse(localStorage.getItem('currentUser'));

      const annonce: AnnonceCreation = {
        owner: user.id,
        titre: this.annonceForm.get('titre').value,
        localisation: this.annonceForm.get('localisation').value,
        category: this.annonceForm.get('category').value,
        price: this.annonceForm.get('price').value,
        description: this.annonceForm.get('description').value,
        nombre_de_chambres: this.annonceForm.get('nombre_de_chambres').value,
        surface: this.annonceForm.get('surface').value,
        image: this.annonceForm.get('image').value,
        date: this.annonceForm.get('date').value,
        equiped: this.annonceForm.get('is_occupied').value,
      };

      console.log('Annonce Created:', annonce);
      this.annonceService.createAnnonce(annonce).subscribe({
        next: (response) => {
          this.showSnackbar();
          this.router.navigate(['/annonces']);

        },
      });
    } else {
      console.log('Form is not valid');
    }
  }
  predict(): void {
    if (this.annonceForm.valid) {
      this.predictionService.predictPrice(this.annonceForm.value).subscribe({
        next: (response) => {
          this.setprice(response);
        },
        error: (error) => {
          this.predictedPrice = null;
        },
      });
    }
  }
}
