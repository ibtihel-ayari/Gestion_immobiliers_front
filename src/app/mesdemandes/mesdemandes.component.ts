import { Component, OnInit } from '@angular/core';
import { OccupationService } from '../services/occupation.service';
import { Occupation } from '../models/occupation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesdemandes',
  templateUrl: './mesdemandes.component.html',
  styleUrls: ['./mesdemandes.component.css'],
})
export class MesdemandesComponent implements OnInit {
  occupations: Occupation[] = [];
  user: any;

  constructor(private occupationService: OccupationService, private router : Router) {}

  ngOnInit(): void {
    // Fetch user data from localStorage
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // Load occupations for this user
    this.loadOccupations();
  }
  goToDetails(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/details', id]);
    }
  }

  loadOccupations(): void {
    this.occupationService.getOccupationsByClient(this.user.id).subscribe({
      next: (data) => {
        this.occupations = data;
      },
      error: (err) => console.error(err),
    });
  }

  handleAccept(occupationId: number): void {
    this.occupationService
      .acceptOccupation(occupationId, 'accepted')
      .subscribe({
        next: () => {
          this.loadOccupations();
        },
        error: (err) => console.error(err),
      });
  }

  handleRefuse(occupationId: number): void {
    this.occupationService.acceptOccupation(occupationId, 'refused').subscribe({
      next: () => {
        this.loadOccupations();
      },
      error: (err) => console.error(err),
    });
  }
}
