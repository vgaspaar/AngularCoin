// src/app/app.routes.ts

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/converter/converter.component').then(m => m.ConverterComponent),
  },
  {
    path: 'rates',
    loadComponent: () =>
      import('./features/rates/rates.component').then(m => m.RatesComponent),
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./features/history/history.component').then(m => m.HistoryComponent),
  },
  { path: '**', redirectTo: '' },
];
