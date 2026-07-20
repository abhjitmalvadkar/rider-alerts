import { createReducer, on } from '@ngrx/store';

import {
  ClearState,
  FetchAlertDetailsFailure,
  FetchAlertDetailsRequest,
  FetchAlertDetailsSuccess,
  FetchAlertTypesFailure,
  FetchAlertTypesSuccess,
  FetchAlertsListFailure,
  FetchAlertsListRequest,
  FetchAlertsListSuccess,
  SetFilter,
  SetPage,
} from './alerts.action';
import { Alert, AlertType, FilterValue } from './alerts.model';

export const ALERTS_FEATURE_KEY = 'alerts';

export interface AlertsListSlice {
  items: Alert[];
  loading: boolean;
  error: boolean;
}

export interface AlertDetailsSlice {
  alert: Alert | null;
  loading: boolean;
  error: boolean;
}

export interface AlertsState {
  alertsList: AlertsListSlice;
  alertDetails: AlertDetailsSlice;
  alertTypes: AlertType[];
  filter: FilterValue;
  page: number;
  pageSize: number;
}

const initialState: AlertsState = {
  alertsList: { items: [], loading: false, error: false },
  alertDetails: { alert: null, loading: false, error: false },
  alertTypes: [],
  filter: 'all',
  page: 1,
  pageSize: 5,
};

export const AlertsReducer = createReducer(
  initialState,

  on(ClearState, () => ({ ...initialState })),

  on(FetchAlertsListRequest, (state) => ({
    ...state,
    alertsList: { ...state.alertsList, loading: true, error: false },
  })),
  on(FetchAlertsListSuccess, (state, { items }) => ({
    ...state,
    alertsList: { items, loading: false, error: false },
  })),
  on(FetchAlertsListFailure, (state) => ({
    ...state,
    alertsList: { items: [], loading: false, error: true },
  })),

  on(FetchAlertDetailsRequest, (state) => ({
    ...state,
    alertDetails: { alert: null, loading: true, error: false },
  })),
  on(FetchAlertDetailsSuccess, (state, { alert }) => ({
    ...state,
    alertDetails: { alert, loading: false, error: false },
  })),
  on(FetchAlertDetailsFailure, (state) => ({
    ...state,
    alertDetails: { alert: null, loading: false, error: true },
  })),

  on(FetchAlertTypesSuccess, (state, { types }) => ({ ...state, alertTypes: types })),
  on(FetchAlertTypesFailure, (state) => ({ ...state, alertTypes: [] })),

  on(SetFilter, (state, { filter }) => ({ ...state, filter, page: 1 })),
  on(SetPage, (state, { page }) => ({ ...state, page })),
);
