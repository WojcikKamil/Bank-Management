/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {
  Routes, RouterModule,
} from '@angular/router';
import HomeComponent from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

const RoutingConfig = RouterModule.forRoot(routes);
export default RoutingConfig;
