/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {
  Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,
} from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

const RoutingConfig = RouterModule.forRoot(routes);
export default RoutingConfig;