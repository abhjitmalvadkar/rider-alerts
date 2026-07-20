import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'alerts', pathMatch: 'full' },
  {
    path: 'alerts',
    loadChildren: () =>
      import('./features/alerts/alerts.routes').then((m) => m.ALERTS_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/alerts/not-found-screen/not-found-screen.component').then(
        (m) => m.NotFoundScreenComponent,
      ),
  },
];
