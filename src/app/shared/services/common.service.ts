import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, map, throwError } from 'rxjs';

import { StartLoading, StopLoading } from '../core/shared.actions';

@Injectable({ providedIn: 'root' })
export class CommonService {
  constructor(
    private store: Store,
    private http: HttpClient,
  ) {}

  callAPI(type: string, url: string, payload?: any, options: any = {}) {
    let apiCall;

    if (type === 'get') {
      apiCall = this.http.get<any>(url, { observe: 'response', ...options });
    } else if (type === 'delete') {
      apiCall = this.http.delete<any>(url, {
        observe: 'response',
        body: payload || {},
        ...options,
      });
    } else {
      // @ts-ignore
      apiCall = this.http[type]<any>(url, payload, { observe: 'response', ...options });
    }

    return apiCall.pipe(
      map((response: any) => {
        if (response instanceof HttpResponse) {
          return response.body;
        }
        return response;
      }),
      catchError((error) => throwError(error)),
    );
  }

  startLoading() {
    this.store.dispatch(StartLoading());
  }

  stopLoading() {
    this.store.dispatch(StopLoading());
  }
}
