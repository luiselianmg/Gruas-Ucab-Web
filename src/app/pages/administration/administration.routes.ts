import { Routes } from '@angular/router';

import { AppUsersComponent } from './users/users.component';
import { AppRolesComponent } from './roles/roles.component';
import { AppPermitsComponent } from './permits/permits.component';

export const AdministrationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        component: AppUsersComponent,
      },
      {
        path: 'roles',
        component: AppRolesComponent,
      },
      {
        path: 'permits',
        component: AppPermitsComponent,
      },
    ],
  },
];
