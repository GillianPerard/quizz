import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  Signal,
  DestroyRef,
  computed,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { QuizzService } from '../../services/quizz/quizz.service';
import { Questions } from '../../services/quizz/quizz';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Observable, combineLatest, map, tap, timer } from 'rxjs';
import { RouterLink } from '@angular/router';
import { formatScore } from '../../helpers/score/score';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RouterLink, SpinnerComponent],
  selector: 'app-home',
  standalone: true,
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export default class HomeComponent {
  protected readonly formattedBestScore = computed(() => formatScore(this.bestScore()));
  protected readonly isLoading = signal(true);
  protected readonly questions: Signal<Questions>;

  private readonly bestScore: Signal<number>;
  private readonly destroyRef = inject(DestroyRef);
  private readonly quizzService = inject(QuizzService);

  constructor() {
    this.questions = toSignal(this.getQuestions(), { initialValue: [] });
    this.bestScore = toSignal(this.gestBestScore(), { initialValue: 0 });
  }

  private getQuestions(): Observable<Questions> {
    return combineLatest([this.quizzService.getQuestions(), timer(400)]).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(() => this.isLoading.set(false)),
      map(([questions]) => questions)
    );
  }

  private gestBestScore(): Observable<number> {
    return this.quizzService.getBestScore().pipe(takeUntilDestroyed(this.destroyRef));
  }
}
