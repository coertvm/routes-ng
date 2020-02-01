import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesService } from "../routes.service";
import { Route } from "../route";
import { PlanetsService } from "../planets.service";
import { Planet } from "../planet";

@Component({
  selector: 'app-route-create',
  templateUrl: './route-create.component.html',
  styleUrls: ['./route-create.component.css']
})
export class RouteCreateComponent implements OnInit {

  private route: Route = new Route();
  private planets: Planet[] = [];

  constructor(
    private router: Router,
    private routesService: RoutesService,
    private planetsService: PlanetsService
  ) { }

  ngOnInit() {
    this.route = new Route();
    this.planetsService.readAll()
      .subscribe((planets: Planet[]) => {
        this.planets = planets;
      });
  }

  create(): void {
    this.routesService.create(this.route)
      .subscribe((route: Route) => {
        this.route = route;
        this.router.navigate(['/route-list']);
      });
  }

  cancel(): void {
    this.router.navigate(['/route-list']);
  }

}