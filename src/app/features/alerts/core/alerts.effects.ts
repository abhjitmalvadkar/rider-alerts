import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, catchError, map, mergeMap, of, tap } from 'rxjs';

import { AlertsService } from './alerts.service';
import { CommonService } from '../../../shared/services/common.service';
import {
  FetchAlertDetailsFailure,
  FetchAlertDetailsRequest,
  FetchAlertDetailsSuccess,
  FetchAlertTypesFailure,
  FetchAlertTypesRequest,
  FetchAlertTypesSuccess,
  FetchAlertsListFailure,
  FetchAlertsListRequest,
  FetchAlertsListSuccess,
} from './alerts.action';

@Injectable()
export class AlertsEffects {
  private alertsService = inject(AlertsService);
  private commonService = inject(CommonService);
  private actions = inject(Actions);

  fetchAlertsList$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(FetchAlertsListRequest),
      tap(() => this.commonService.startLoading()),
      mergeMap(() =>
        this.alertsService.getAlerts().pipe(
          map((items) => {
            const sorted = [...items].sort((a, b) => {
              const ta = new Date(a.effectiveDate ?? 0).getTime();
              const tb = new Date(b.effectiveDate ?? 0).getTime();
              return tb - ta;
            });
            return FetchAlertsListSuccess({ items: sorted });
          }),
          catchError(() => of(FetchAlertsListFailure())),
          tap(() => this.commonService.stopLoading()),
        ),
      ),
    ),
  );

  fetchAlertDetails$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(FetchAlertDetailsRequest),
      tap(() => this.commonService.startLoading()),
      mergeMap(({ id }) =>
        this.alertsService.getAlertById(id).pipe(
          map((alert) =>
            alert ? FetchAlertDetailsSuccess({ alert }) : FetchAlertDetailsFailure(),
          ),
          catchError(() => of(FetchAlertDetailsFailure())),
          tap(() => this.commonService.stopLoading()),
        ),
      ),
    ),
  );

  fetchAlertTypes$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(FetchAlertTypesRequest),
      tap(() => this.commonService.startLoading()),
      mergeMap(() =>
        this.alertsService.getAlertTypes().pipe(
          map((types) => FetchAlertTypesSuccess({ types })),
          catchError(() => of(FetchAlertTypesFailure())),
          tap(() => this.commonService.stopLoading()),
        ),
      ),
    ),
  );
}
