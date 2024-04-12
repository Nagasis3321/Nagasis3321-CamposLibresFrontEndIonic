import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then((m) => m.MainPage),
    pathMatch: 'full',
  },
  {
    path: 'animales',
    loadComponent: () =>
      import('./animales/animales.page').then((m) => m.AnimalesPage),
  },
  {
    path: 'duenos',
    loadComponent: () =>
      import('./duenos/duenos.page').then((m) => m.DuenosPage),
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
