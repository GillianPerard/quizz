import { Injectable, inject } from '@angular/core';
import { Question, Questions, QuizzResult, UserAnswer, UserAnswers } from './quizz';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { toNumber } from '../../utils/number/number';
import { environment } from '../../../environments/environment';
import { AnswerType } from './answer-type.enum';

const BEST_SCORE_KEY = 'bestScore';

const POINTS_PER_ANSWER_TYPE = {
  [AnswerType.Choice]: 1,
  [AnswerType.MultipleChoice]: 2,
  [AnswerType.Text]: 3,
};

@Injectable({ providedIn: 'root' })
export class QuizzService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getBestScore(): Observable<number> {
    return of(this.getBestScoreFromLocalStorage());
  }

  getQuestions(): Observable<Questions> {
    return this.http.get<Questions>(`${this.apiUrl}/quizz.json`).pipe(catchError(() => of([])));
  }

  updateBestScore(score: number): Observable<number> {
    const bestScore = this.getBestScoreFromLocalStorage();

    if (score > bestScore) {
      localStorage.setItem(BEST_SCORE_KEY, score.toString());

      return of(score);
    }

    return of(bestScore);
  }

  validate(questions: Questions, userAnswers: UserAnswers): Observable<QuizzResult> {
    const result = questions.reduce<QuizzResult>(
      (acc, question, index) => {
        const answer = userAnswers[index];
        const isValid = this.isValidAnswer(question, answer);
        acc.questions.push([question.label, isValid]);
        acc.score += isValid ? POINTS_PER_ANSWER_TYPE[question.answerType] : 0;

        return acc;
      },
      { questions: [], score: 0 }
    );

    return of(result);
  }

  private getBestScoreFromLocalStorage(): number {
    return toNumber(localStorage.getItem(BEST_SCORE_KEY));
  }

  private isValidAnswer(question: Question, answer: UserAnswer): boolean {
    if (question.answerType !== AnswerType.MultipleChoice) {
      return question.answer === answer;
    }

    if (!Array.isArray(answer) || answer.length !== question.answers.length) {
      return false;
    }

    for (const goodAnswer of question.answers) {
      if (!answer.find(userAnswer => userAnswer === goodAnswer)) {
        return false;
      }
    }

    return true;
  }
}
