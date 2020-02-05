import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanetListComponent } from './planet-list/planet-list.component';
import { PlanetCreateComponent } from './planet-create/planet-create.component';
import { PlanetUpdateComponent } from './planet-update/planet-update.component';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteCreateComponent } from './route-create/route-create.component';
import { RouteUpdateComponent } from './route-update/route-update.component';
import { ShortestRouteComponent } from './shortest-route/shortest-route.component';

const routes: Routes = [
  { path: 'planet-list', component: PlanetListComponent },
  { path: 'planet-create', component: PlanetCreateComponent },
  { path: 'planet-update/:id', component: PlanetUpdateComponent },
  { path: 'route-list', component: RouteListComponent },
  { path: 'route-create', component: RouteCreateComponent },
  { path: 'route-update/:id', component: RouteUpdateComponent },
  { path: 'shortest-route', component: ShortestRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }