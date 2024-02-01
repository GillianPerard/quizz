import { Routes } from '@angular/router';

export const routes: Routes = [
  { loadComponent: () => import('./pages/not-found/not-found.component'), path: '404' },
  { path: '**', pathMatch: 'full', redirectTo: '404' },
];
