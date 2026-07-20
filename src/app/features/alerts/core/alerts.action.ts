import { createAction, props } from '@ngrx/store';

import { Alert, AlertType, FilterValue } from './alerts.model';

const CLEAR_STATE = '[alerts] clear state';
export const ClearState = createAction(CLEAR_STATE);

const FETCH_ALERTS_LIST_REQUEST = '[alerts] fetch alerts list requested';
export const FetchAlertsListRequest = createAction(FETCH_ALERTS_LIST_REQUEST);

const FETCH_ALERTS_LIST_SUCCESS = '[alerts] fetch alerts list successful';
export const FetchAlertsListSuccess = createAction(
  FETCH_ALERTS_LIST_SUCCESS,
  props<{ items: Alert[] }>(),
);

const FETCH_ALERTS_LIST_FAILURE = '[alerts] fetch alerts list failure';
export const FetchAlertsListFailure = createAction(FETCH_ALERTS_LIST_FAILURE);

const FETCH_ALERT_DETAILS_REQUEST = '[alerts] fetch alert details requested';
export const FetchAlertDetailsRequest = createAction(
  FETCH_ALERT_DETAILS_REQUEST,
  props<{ id: number }>(),
);

const FETCH_ALERT_DETAILS_SUCCESS = '[alerts] fetch alert details successful';
export const FetchAlertDetailsSuccess = createAction(
  FETCH_ALERT_DETAILS_SUCCESS,
  props<{ alert: Alert }>(),
);

const FETCH_ALERT_DETAILS_FAILURE = '[alerts] fetch alert details failure';
export const FetchAlertDetailsFailure = createAction(FETCH_ALERT_DETAILS_FAILURE);

const FETCH_ALERT_TYPES_REQUEST = '[alerts] fetch alert types requested';
export const FetchAlertTypesRequest = createAction(FETCH_ALERT_TYPES_REQUEST);

const FETCH_ALERT_TYPES_SUCCESS = '[alerts] fetch alert types successful';
export const FetchAlertTypesSuccess = createAction(
  FETCH_ALERT_TYPES_SUCCESS,
  props<{ types: AlertType[] }>(),
);

const FETCH_ALERT_TYPES_FAILURE = '[alerts] fetch alert types failure';
export const FetchAlertTypesFailure = createAction(FETCH_ALERT_TYPES_FAILURE);

const SET_FILTER = '[alerts] set filter';
export const SetFilter = createAction(SET_FILTER, props<{ filter: FilterValue }>());

const SET_PAGE = '[alerts] set page';
export const SetPage = createAction(SET_PAGE, props<{ page: number }>());
