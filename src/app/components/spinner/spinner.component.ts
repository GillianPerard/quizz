import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-spinner',
  standalone: true,
  styleUrl: './spinner.component.scss',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  size = input<number>(48);
}
