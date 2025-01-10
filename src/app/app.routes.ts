import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard';

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
        canActivate: [AuthGuard], // Protege la ruta del dashboard
      },
      {
        path: 'functionalities',
        loadChildren: () =>
          import('./pages/functionalities/functionalities.routes').then(
            (m) => m.FunctionalitiesRoutes
          ),
        canActivate: [AuthGuard], // Protege la ruta de funcionalidades
      },
      {
        path: 'administration',
        loadChildren: () =>
          import('./pages/administration/administration.routes').then(
            (m) => m.AdministrationRoutes
          ),
        canActivate: [AuthGuard], // Protege la ruta de administración
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
