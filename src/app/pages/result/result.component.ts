import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { QuizzResult } from '../../services/quizz/quizz';
import { formatScore } from '../../helpers/score/score';
import { QuizzService } from '../../services/quizz/quizz.service';
import { first } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-result',
  standalone: true,
  styleUrl: './result.component.scss',
  templateUrl: './result.component.html',
})
export default class ResultComponent {
  result = input.required<QuizzResult>();

  protected readonly formattedBestScore = computed(() => formatScore(this.bestScore()));
  protected readonly formattedScore = computed(() => formatScore(this.result().score));
  protected readonly isNewRecord = computed(() => this.result().score >= this.bestScore());

  private readonly bestScore = signal(0);
  private readonly quizzService = inject(QuizzService);

  constructor() {
    effect(
      () => {
        this.quizzService
          .updateBestScore(this.result().score)
          .pipe(first())
          .subscribe(bestScore => {
            this.bestScore.set(bestScore);
          });
      },
      { allowSignalWrites: true }
    );
  }
}
