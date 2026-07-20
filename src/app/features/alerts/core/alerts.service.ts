import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Alert, AlertType } from './alerts.model';
import { mapRawToAlert } from './alerts.mapper';
import { CommonService } from '../../../shared/services/common.service';
import { v1URL } from '../../../shared/constants/urls.constants';

@Injectable({ providedIn: 'root' })
export class AlertsService {
  private commonService = inject(CommonService);

  getAlerts(): Observable<Alert[]> {
    const urlConfig = v1URL.alerts.fetchList;
    return this.commonService.callAPI(urlConfig.method, urlConfig.url).pipe(
      map((response: any) => (response?.items ?? []).map(mapRawToAlert)),
    );
  }

  getAlertTypes(): Observable<AlertType[]> {
    const urlConfig = v1URL.alerts.fetchTypes;
    return this.commonService.callAPI(urlConfig.method, urlConfig.url).pipe(
      map((response: any) => (response as AlertType[]) ?? []),
    );
  }

  getAlertById(id: number): Observable<Alert | undefined> {
    return this.getAlerts().pipe(map((items) => items.find((a) => a.id === id)));
  }
}
