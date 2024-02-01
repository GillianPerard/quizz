import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
})
export class InputComponent {
  label = input.required<string>();
  name = input.required<string>();
  value = input.required();

  @Output() enter = new EventEmitter();
  @Output() valueChange = new EventEmitter();

  protected handleValueChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }

  protected handleEnter(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.enter.emit();
  }
}
