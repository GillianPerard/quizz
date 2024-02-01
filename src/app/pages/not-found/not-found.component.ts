import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-not-found',
  standalone: true,
  styleUrl: './not-found.component.scss',
  templateUrl: './not-found.component.html',
})
export default class NotFoundComponent {}
