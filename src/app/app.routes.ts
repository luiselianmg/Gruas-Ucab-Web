import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { CreateuserComponent } from './components/createuser/createuse.component';
import { TableuserComponent } from './components/tableuser/tableuser.component';
import LayoutComponent from './layout/layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', 
    component: LayoutComponent, canActivate: [authGuard],
    children: [
      {
        path: 'createuser', component: CreateuserComponent
      },
      {
        path: 'tableuser', component: TableuserComponent 
      },
    ]
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  
  
];
