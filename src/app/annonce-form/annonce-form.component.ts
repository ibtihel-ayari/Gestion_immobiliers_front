// annonce-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnonceService } from '../services/annonce.service';
import { AnnonceCreation } from '../models/create-annoce';

@Component({
  selector: 'app-annonce-form',
  templateUrl: './annonce-form.component.html',
})
export class AnnonceFormComponent implements OnInit {
  annonceForm: FormGroup;

  constructor(private fb: FormBuilder, private annonceService: AnnonceService) {
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
      date: ['',[Validators.required]],
      image: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {}

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
        date : this.annonceForm.get('date').value      };

      console.log('Annonce Created:', annonce);
      this.annonceService.createAnnonce(annonce).subscribe({
        next: (response) => {
          alert(JSON.stringify(response));
        },
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
