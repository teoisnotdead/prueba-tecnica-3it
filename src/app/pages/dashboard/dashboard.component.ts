import { Component } from '@angular/core';
import { INDICATORS } from '../../constants/indicators';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  indicators = INDICATORS;

  constructor(private readonly router: Router) {}

  listOfValue(idicatorId: string) {
    this.router.navigate(['/valores', idicatorId]);
  }

  detailsIndicator(idicatorId: string) {
    this.router.navigate(['/detalles', idicatorId]);
  }
}
