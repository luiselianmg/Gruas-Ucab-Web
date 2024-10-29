import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { CreateuserComponent } from './components/createuser/createuse.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'createuser', component: CreateuserComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
