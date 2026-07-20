import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  imports: [MatIcon],
  templateUrl: './empty-state.component.html',
  styleUrl: './list-states.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  message = input<string>('No alerts match this filter.');
  actionLabel = input<string | null>(null);
  action = output<void>();

  onAction(): void {
    this.action.emit();
  }
}
