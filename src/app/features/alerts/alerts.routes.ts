import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { ALERTS_FEATURE_KEY, AlertsReducer } from './core/alerts.reducer';
import { AlertsEffects } from './core/alerts.effects';

export const ALERTS_ROUTES: Routes = [
  {
    path: '',
    providers: [provideState(ALERTS_FEATURE_KEY, AlertsReducer), provideEffects(AlertsEffects)],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./alerts-list-screen/alerts-list-screen.component').then(
            (m) => m.AlertsListScreenComponent,
          ),
        data: {
          header: {
            title: 'Rider Alerts',
            subtitle:
              'Up-to-date information regarding service changes, detours, or updates impacting your ride.',
          },
        },
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./alert-details-screen/alert-details-screen.component').then(
            (m) => m.AlertDetailsScreenComponent,
          ),
        data: {
          header: {
            title: 'Alert Details',
            navLink: '/alerts',
            navLabel: 'Back to Rider Alerts',
          },
        },
      },
    ],
  },
];
