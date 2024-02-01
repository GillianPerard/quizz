import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';

enum CheckType {
  Checkbox = 'checkbox',
  Radio = 'radio',
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
  selector: 'app-check',
  standalone: true,
  styleUrl: './check.component.scss',
  templateUrl: './check.component.html',
})
export class CheckComponent {
  checked = input.required({ transform: booleanAttribute });
  name = input.required<string>();
  radio = input(false, { transform: booleanAttribute });
  value = input.required();

  @Output() check = new EventEmitter();

  protected readonly type = computed(() => (this.radio() ? CheckType.Radio : CheckType.Checkbox));

  protected handleChange(): void {
    this.check.emit(this.value());
  }
}
