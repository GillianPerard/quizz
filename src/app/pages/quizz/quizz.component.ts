import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  effect,
  input,
  Signal,
} from '@angular/core';
import { Questions, UserAnswer, UserAnswers } from '../../services/quizz/quizz';
import { Router, RouterLink } from '@angular/router';
import { AnswerType } from '../../services/quizz/answer-type.enum';
import { CheckComponent } from '../../components/form/check/check.component';
import { InputComponent } from '../../components/form/input/input.component';
import { Observable, first, map, switchMap, take, timer } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuizzService } from '../../services/quizz/quizz.service';
import { DOCUMENT } from '@angular/common';

const COUNTDOWN_DIGITS = 4;
const QUIZZ_DURATION_IN_S = 120;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckComponent, InputComponent, RouterLink],
  selector: 'app-quizz',
  standalone: true,
  styleUrl: './quizz.component.scss',
  templateUrl: './quizz.component.html',
})
export default class QuizzComponent {
  questions = input.required<Questions>();

  protected readonly AnswerType = AnswerType;
  protected readonly currentAnswer = computed<UserAnswer | undefined>(
    () => this.userAnswers()[this.currentQuestionIndex()]
  );
  protected readonly currentQuestion = computed(
    () => this.questions()[this.currentQuestionIndex()]
  );
  protected readonly currentQuestionIndex = signal(0);
  protected readonly formattedCountdown = computed(() => {
    const countdown = this.countdown().toString();
    const missingLength = COUNTDOWN_DIGITS - countdown.length;

    return `${new Array(missingLength).fill(0).join('')}${countdown}`;
  });
  protected readonly step = computed(
    () => `${this.currentQuestionIndex() + 1}/${this.questions().length}`
  );
  protected readonly userAnswers = signal<UserAnswers>([]);

  private readonly countdown = this.createCountdown(QUIZZ_DURATION_IN_S);
  private readonly document = inject(DOCUMENT);
  private readonly quizzService = inject(QuizzService);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      if (this.countdown() === 0) {
        this.validate().pipe(first()).subscribe();
      }
    });
  }

  protected handleValidate(): void {
    const isLastQuestion = this.currentQuestionIndex() + 1 === this.questions().length;

    if (!isLastQuestion) {
      this.currentQuestionIndex.update(index => index + 1);
      this.focusInput();
    } else {
      this.validate().pipe(first()).subscribe();
    }
  }

  protected isChecked(choice: string): boolean {
    const answer = this.currentAnswer();
    const question = this.currentQuestion();

    if (question.answerType === AnswerType.Choice) {
      return answer === choice;
    } else if (question.answerType === AnswerType.MultipleChoice) {
      return (answer ?? []).includes(choice);
    }

    return false;
  }

  protected updateAnswer(answer: string): void {
    const currentQuestionIndex = this.currentQuestionIndex();

    this.userAnswers.update(answers => {
      if (this.currentQuestion().answerType !== AnswerType.MultipleChoice) {
        answers[currentQuestionIndex] = answer;
      } else {
        const currentAnswer = (answers[currentQuestionIndex] as Array<string>) ?? [];
        const index = currentAnswer.findIndex(choice => choice === answer);

        if (index > -1) {
          currentAnswer.splice(index, 1);
        } else {
          currentAnswer.push(answer);
        }

        answers[currentQuestionIndex] = currentAnswer;
      }

      return [...answers];
    });
  }

  private createCountdown(durationInSecond: number): Signal<number> {
    return toSignal(
      timer(0, 1000).pipe(
        take(durationInSecond + 1),
        map(secondsElapsed => durationInSecond - secondsElapsed)
      ),
      { initialValue: durationInSecond }
    );
  }

  private focusInput(): void {
    // little hack to launch the focus after next rerender
    setTimeout(() => this.document.querySelector<HTMLInputElement>('input[type="text"]')?.focus());
  }

  private validate(): Observable<boolean> {
    return this.quizzService
      .validate(this.questions(), this.userAnswers())
      .pipe(switchMap(result => this.router.navigateByUrl('/result', { state: { result } })));
  }
}
