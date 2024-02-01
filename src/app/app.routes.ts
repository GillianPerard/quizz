import { Routes } from '@angular/router';

export const routes: Routes = [
  { loadComponent: () => import('./pages/home/home.component'), path: '' },
  {
    data: { questions: [] },
    loadComponent: () => import('./pages/quizz/quizz.component'),
    path: 'quizz',
  },
  { loadComponent: () => import('./pages/not-found/not-found.component'), path: '404' },
  { path: '**', pathMatch: 'full', redirectTo: '404' },
];
