import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'valores/:id',
    loadComponent() {
      return import('./pages/list-of-values/list-of-values.component').then(
        (m) => m.ListOfValuesComponent
      );
    },
  },
  {
    path: 'detalles/:id',
    loadComponent() {
      return import('./pages/details/details.component').then(
        (m) => m.DetailsComponent
      );
    },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];
