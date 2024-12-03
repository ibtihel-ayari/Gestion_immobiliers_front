import { Component, OnInit } from '@angular/core';
import { OccupationService } from '../services/occupation.service';
import { Occupation } from '../models/occupation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-occupation-list',
  templateUrl: './occupation-list.component.html',
  styleUrls: ['./occupation-list.component.css'],
})
export class OccupationListComponent implements OnInit {
  occupations: Occupation[] = [];
  user: any;

  constructor(
    private occupationService: OccupationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Fetch user data from localStorage
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // Load occupations for this user
    this.loadOccupations();
  }

  loadOccupations(): void {
    this.occupationService.getOccupationsByOwner(this.user.id).subscribe({
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
          this.showSnackbar('occupation acceptée');
        },
        error: (err) => console.error(err),
      });
  }
  showSnackbar(body: string): void {
    this.snackBar.open(body, 'Close', {
      duration: 3000, // milliseconds
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'bottom', // 'top' | 'bottom'
    });
  }

  handleRefuse(occupationId: number): void {
    this.occupationService.acceptOccupation(occupationId, 'refused').subscribe({
      next: () => {
        this.loadOccupations();
        this.showSnackbar('occupation refusée');
      },
      error: (err) => console.error(err),
    });
  }
}
