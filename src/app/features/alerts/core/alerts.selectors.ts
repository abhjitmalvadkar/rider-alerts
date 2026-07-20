import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ALERTS_FEATURE_KEY, AlertsState } from './alerts.reducer';
import { FilterOption } from './alerts.model';

const AlertsData = createFeatureSelector<AlertsState>(ALERTS_FEATURE_KEY);

export const alertsList = createSelector(AlertsData, (s) => s.alertsList.items);
export const alertsListLoading = createSelector(AlertsData, (s) => s.alertsList.loading);
export const alertsListError = createSelector(AlertsData, (s) => s.alertsList.error);
export const alertDetails = createSelector(AlertsData, (s) => s.alertDetails.alert);
export const alertDetailsLoading = createSelector(AlertsData, (s) => s.alertDetails.loading);
export const alertDetailsError = createSelector(AlertsData, (s) => s.alertDetails.error);
export const alertTypes = createSelector(AlertsData, (s) => s.alertTypes);
export const filter = createSelector(AlertsData, (s) => s.filter);
export const page = createSelector(AlertsData, (s) => s.page);
export const pageSize = createSelector(AlertsData, (s) => s.pageSize);

export const filterOptions = createSelector(alertTypes, (types): FilterOption[] => [
  { value: 'all', label: 'All' },
  ...types.map((t) => ({ value: t.id, label: t.name })),
]);

export const filteredAlerts = createSelector(alertsList, filter, (items, f) =>
  f === 'all' ? items : items.filter((a) => a.typeId === f),
);

export const resultCount = createSelector(filteredAlerts, (a) => a.length);

export const totalPages = createSelector(filteredAlerts, pageSize, (a, size) =>
  Math.max(1, Math.ceil(a.length / size)),
);

export const pagedAlerts = createSelector(filteredAlerts, page, pageSize, (items, p, size) =>
  items.slice((p - 1) * size, (p - 1) * size + size),
);

export const alertById = (id: number) =>
  createSelector(alertsList, (items) => items.find((a) => a.id === id) ?? null);
