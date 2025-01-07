import { Routes } from '@angular/router';

import { AppLoginComponent } from './login/login.component';
import { AppForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { AppPasswordComponent } from './password/password.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppLoginComponent,
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'forgot-pwd',
        component: AppForgotPwdComponent,
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'password',
        component: AppPasswordComponent,
      },
    ],
  },
];
