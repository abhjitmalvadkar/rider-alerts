import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Alert } from '../../core/alerts.model';
import { DateRangePipe } from '../../../../shared/pipes/date-range.pipe';

@Component({
  selector: 'app-alert-card',
  imports: [DateRangePipe, MatIcon],
  templateUrl: './alert-card.component.html',
  styleUrl: './alert-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertCardComponent {
  alert = input.required<Alert>();
  open = output<number>();

  activate(event?: Event): void {
    if (event) event.preventDefault();
    this.open.emit(this.alert().id);
  }
}
