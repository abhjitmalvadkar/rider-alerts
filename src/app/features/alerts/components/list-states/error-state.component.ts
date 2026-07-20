import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-error-state',
  imports: [MatIcon],
  templateUrl: './error-state.component.html',
  styleUrl: './list-states.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorStateComponent {
  message = input<string>("We couldn't load rider alerts. Please try again.");
  retry = output<void>();

  onRetry(): void {
    this.retry.emit();
  }
}
