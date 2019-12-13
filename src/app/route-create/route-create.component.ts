import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanetsService } from "../planets.service";
import { Planet } from "../planet";
import { RoutesService } from "../routes.service";
import { Route } from "../route";

@Component({
  selector: 'app-route-create',
  templateUrl: './route-create.component.html',
  styleUrls: ['./route-create.component.css']
})
export class RouteCreateComponent implements OnInit {

  private planets: Planet[] = [];
  private planet1Id: string = null;
  private planet2Id: string = null;
  private distance: string = null;
  private route: Route = new Route();

  constructor(
    private router: Router,
    private planetsService: PlanetsService,
    private routesService: RoutesService
  ) { }

  ngOnInit() {
    this.planetsService.readAll()
      .subscribe((planets: Planet[]) => {
        this.planets = planets;
      });
  }

  create(): void {
    this.route.planet1 = this.planets.find(planet => planet.id.toString() == this.planet1Id);
    this.route.planet2 = this.planets.find(planet => planet.id.toString() == this.planet2Id);
    this.route.distance = Number(this.distance);
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