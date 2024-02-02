import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Questions, QuizzResult } from './services/quizz/quizz';
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

        return questions ?? inject(QuizzService).getQuestions();
      },
    },
  },
  {
    loadComponent: () => import('./pages/result/result.component'),
    path: 'result',
    resolve: {
      result: () => {
        const router = inject(Router);
        const state = router.getCurrentNavigation()?.extras.state;
        const result = state?.['result'] as QuizzResult;

        return result ?? router.navigateByUrl('/404');
      },
    },
    title: 'Résultat',
  },
  {
    loadComponent: () => import('./pages/not-found/not-found.component'),
    path: '404',
    title: 'Page introuvable',
  },
  { path: '**', pathMatch: 'full', redirectTo: '404' },
];
