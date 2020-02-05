import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanetCreateComponent } from './planet-create/planet-create.component';
import { PlanetUpdateComponent } from './planet-update/planet-update.component';
import { PlanetListComponent } from './planet-list/planet-list.component';
import { RouteCreateComponent } from './route-create/route-create.component';
import { RouteUpdateComponent } from './route-update/route-update.component';
import { RouteListComponent } from './route-list/route-list.component';
import { ShortestRouteComponent } from './shortest-route/shortest-route.component';

@NgModule({
  declarations: [
    AppComponent,
    PlanetCreateComponent,
    PlanetUpdateComponent,
    PlanetListComponent,
    RouteCreateComponent,
    RouteUpdateComponent,
    RouteListComponent,
    ShortestRouteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }