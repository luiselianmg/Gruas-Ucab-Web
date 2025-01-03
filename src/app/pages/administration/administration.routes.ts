import { Routes } from '@angular/router';

import { AppProvidersComponent } from './providers/providers.component';
import { AppUsersComponent } from './users/users.component';

export const AdministrationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        component: AppUsersComponent,
      },
      {
        path: 'providers',
        component: AppProvidersComponent,
      },
    ],
  },
];
