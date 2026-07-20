import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import {
  FetchAlertTypesRequest,
  FetchAlertsListRequest,
  SetFilter,
  SetPage,
} from '../core/alerts.action';
import {
  alertsListError,
  alertsListLoading,
  filter,
  filterOptions,
  page,
  pagedAlerts,
  resultCount,
  totalPages,
} from '../core/alerts.selectors';
import { FilterValue } from '../core/alerts.model';

import { AlertFilterBarComponent } from '../components/alert-filter-bar/alert-filter-bar.component';
import { AlertListComponent } from '../components/alert-list/alert-list.component';

@Component({
  selector: 'app-alerts-list-screen',
  imports: [AlertFilterBarComponent, AlertListComponent],
  templateUrl: './alerts-list-screen.component.html',
  styleUrl: './alerts-list-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsListScreenComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  options = this.store.selectSignal(filterOptions);
  items = this.store.selectSignal(pagedAlerts);
  total = this.store.selectSignal(resultCount);
  filter = this.store.selectSignal(filter);
  page = this.store.selectSignal(page);
  totalPages = this.store.selectSignal(totalPages);
  loading = this.store.selectSignal(alertsListLoading);
  error = this.store.selectSignal(alertsListError);

  status = computed<'loading' | 'error' | 'success'>(() => {
    if (this.loading()) return 'loading';
    if (this.error()) return 'error';
    return 'success';
  });

  private qp = toSignal(this.route.queryParamMap);

  constructor() {
    this.store.dispatch(FetchAlertsListRequest());
    this.store.dispatch(FetchAlertTypesRequest());

    effect(() => {
      const params = this.qp();
      const typeRaw = params?.get('type');
      const pageRaw = params?.get('page');
      const filter: FilterValue = !typeRaw || typeRaw === 'all' ? 'all' : Number(typeRaw);
      const parsedPage = Number(pageRaw ?? '1');
      const p = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
      this.store.dispatch(SetFilter({ filter }));
      this.store.dispatch(SetPage({ page: p }));
    });
  }

  onFilter(value: FilterValue): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { type: value, page: 1 },
      queryParamsHandling: 'merge',
    });
  }

  onPage(p: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: p },
      queryParamsHandling: 'merge',
    });
  }

  onOpen(id: number): void {
    this.router.navigate(['/alerts', id]);
  }

  showAll(): void {
    this.onFilter('all');
  }

  retry(): void {
    this.store.dispatch(FetchAlertsListRequest());
    this.store.dispatch(FetchAlertTypesRequest());
  }
}
