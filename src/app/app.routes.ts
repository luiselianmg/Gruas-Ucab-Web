import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { ServiceOrderComponent } from './pages/service-order/service-order.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from './main/layout/layout.component';


export const routes: Routes = [
  /*{ path: 'login', component: LoginFormComponent },*/
  

  { path: '', 
    component: LayoutComponent, /*canActivate: [authGuard],*/
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'user',
        component: UserComponent, 
      },
      {
        path: 'serviceOrder',
        component: ServiceOrderComponent
      }
    ]
  },

  
  
  
  
];

