import { Injectable, inject } from '@angular/core';
import { Questions } from './quizz';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { toNumber } from '../../utils/number/number';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuizzService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getBestScore(): Observable<number> {
    const bestScore = toNumber(localStorage.getItem('bestScore'));

    return of(bestScore);
  }

  getQuestions(): Observable<Questions> {
    return this.http.get<Questions>(`${this.apiUrl}/quizz.json`).pipe(catchError(() => of([])));
  }
}
