/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {
  Routes, RouterModule,
} from '@angular/router';
import AuthGuard from './auth.guard';
import LoginComponent from './components/entry/login/login.component';
import RegisterComponent from './components/entry/register/register.component';
import HomeComponent from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];

const RoutingConfig = RouterModule.forRoot(routes);
export default RoutingConfig;
