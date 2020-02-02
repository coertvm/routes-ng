import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RoutesService } from "../routes.service";
import { Route } from "../route";
import { PlanetsService } from "../planets.service";
import { Planet } from "../planet";

@Component({
  selector: 'app-route-update',
  templateUrl: './route-update.component.html',
  styleUrls: ['./route-update.component.css']
})
export class RouteUpdateComponent implements OnInit {

  private route: Route = new Route();
  private planets: Planet[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private routesService: RoutesService,
    private planetsService: PlanetsService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.planetsService.readAll()
        .subscribe((planets: Planet[]) => {
          this.planets = planets;
          this.routesService.readOne(params.get('id'))
            .subscribe((route: Route) => {
              this.route = route;
              this.route.from = this.planets.find(planet => planet.id === this.route.from.id);
              this.route.to = this.planets.find(planet => planet.id === this.route.to.id);
            });
        });
    });
  }

  update(): void {
    this.routesService.update(this.route, this.route.id)
      .subscribe((route: Route) => {
        this.route = route;
        this.router.navigate(['/route-list']);
      });
  }

  delete(): void {
    this.routesService.delete(this.route.id)
      .subscribe(() => {
        this.router.navigate(['/route-list']);
      });
  }

  cancel(): void {
    this.router.navigate(['/route-list']);
  }

}