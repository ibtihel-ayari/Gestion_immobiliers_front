import { Component, OnInit } from '@angular/core';
import { OccupationService } from '../services/occupation.service';

@Component({
  selector: 'app-occupation-list',
  templateUrl: './occupation-list.component.html',
  styleUrls: ['./occupation-list.component.css']
})
export class OccupationListComponent implements OnInit {
  occupations: any[] = [];
  user: any;

  constructor(private occupationService: OccupationService) {}

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
      error: (err) => console.error(err)
    });
  }

  handleAccept(occupationId: number): void {
    this.occupationService.acceptOccupation(occupationId,"accepted").subscribe({
      next: () => {
        this.loadOccupations();
      },
      error: (err) => console.error(err)
    });
  }

  handleRefuse(occupationId: number): void {
    this.occupationService.acceptOccupation(occupationId,"refused").subscribe({
      next: () => {
        this.loadOccupations();
      },
      error: (err) => console.error(err)
    });
  }


}