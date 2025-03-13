import { Component } from '@angular/core';
import { INDICATORS } from '../../constants/indicators';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'dashboard',
imports: [MatCardModule, MatButtonModule, MatIconModule, MatList, MatListItem],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  indicators = INDICATORS;

  constructor(private readonly router: Router) { }

  listOfValue(idicatorId: string) {
    this.router.navigate(['/valores', idicatorId]);
  }

  detailsIndicator(idicatorId: string) {
    this.router.navigate(['/detalles', idicatorId]);
  }

}
