import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Questions } from './services/quizz/quizz';
import { QuizzService } from './services/quizz/quizz.service';

export const routes: Routes = [
  { loadComponent: () => import('./pages/home/home.component'), path: '' },
  {
    loadComponent: () => import('./pages/quizz/quizz.component'),
    path: 'quizz',
    resolve: {
      questions: () => {
        const state = inject(Router).getCurrentNavigation()?.extras.state;
        const questions = state?.['questions'] as Questions | undefined;

        if (questions?.length) {
          return questions;
        }

        return inject(QuizzService).getQuestions();
      },
    },
  },
  { loadComponent: () => import('./pages/not-found/not-found.component'), path: '404' },
  { path: '**', pathMatch: 'full', redirectTo: '404' },
];
