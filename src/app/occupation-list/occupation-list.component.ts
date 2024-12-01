import { Component, OnInit } from '@angular/core';
import { OccupationService } from '../services/occupation.service';

@Component({
  selector: 'app-occupation-list',
  templateUrl: './occupation-list.component.html',
  styleUrls: ['./occupation-list.component.css']
})
export class OccupationListComponent implements OnInit {
  occupations: any[] = [];

  constructor(private occupationService: OccupationService) {}

  ngOnInit(): void {
    const annonceId = 1; // Replace with the actual annonce ID
    this.loadOccupations(annonceId);
  }

  loadOccupations(annonceId: number): void {
    this.occupationService.getOccupationsByAnnonce(annonceId).subscribe(
      (data) => {
        this.occupations = data;
      },
      (error) => {
        console.error('Error fetching occupations:', error);
      }
    );
  }

  acceptOccupation(occupationId: number): void {
    this.occupationService.acceptOccupation(occupationId).subscribe(
      () => {
        alert('Occupation accepted successfully.');
        this.occupations = this.occupations.filter((o) => o.id !== occupationId);
      },
      (error) => {
        console.error('Error accepting occupation:', error);
      }
    );
  }

 
}