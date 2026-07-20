import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Alert } from '../../core/alerts.model';

type Status = 'loading' | 'error' | 'success';

import { AlertCardComponent } from '../alert-card/alert-card.component';
import { AlertPaginationComponent } from '../alert-pagination/alert-pagination.component';
import { EmptyStateComponent } from '../list-states/empty-state.component';
import { ErrorStateComponent } from '../list-states/error-state.component';

@Component({
  selector: 'app-alert-list',
  imports: [
    AlertCardComponent,
    AlertPaginationComponent,
    EmptyStateComponent,
    ErrorStateComponent,
  ],
  templateUrl: './alert-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertListComponent {
  alerts = input.required<Alert[]>();
  status = input.required<Status>();
  page = input.required<number>();
  totalPages = input.required<number>();
  count = input.required<number>();

  open = output<number>();
  pageChange = output<number>();
  retry = output<void>();
  showAll = output<void>();
}
