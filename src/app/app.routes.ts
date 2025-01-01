import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'functionalities',
        loadChildren: () =>
          import('./pages/functionalities/functionalities.routes').then(
            (m) => m.FunctionalitiesRoutes
          ),
      },
      {
        path: 'administration',
        loadChildren: () =>
          import('./pages/administration/administration.routes').then(
            (m) => m.AdministrationRoutes
          ),
      },
    ],
  },
];
