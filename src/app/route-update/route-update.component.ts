import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PlanetsService } from "../planets.service";
import { Planet } from "../planet";
import { RoutesService } from "../routes.service";
import { Route } from "../route";

@Component({
  selector: 'app-route-update',
  templateUrl: './route-update.component.html',
  styleUrls: ['./route-update.component.css']
})
export class RouteUpdateComponent implements OnInit {

  private planets: Planet[] = [];
  private planet1Id: string = null;
  private planet2Id: string = null;
  private distance: string = null;
  private route: Route = new Route();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private planetsService: PlanetsService,
    private routesService: RoutesService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.routesService.readOne(params.get('id'))
        .subscribe((route: Route) => {
          this.route = route;
        });
    });
    this.planetsService.readAll()
      .subscribe((planets: Planet[]) => {
        this.planets = planets;
      });
  }

  update(): void {
    this.route.planet1 = this.planets.find(planet => planet.id.toString() === this.planet1Id);
    this.route.planet2 = this.planets.find(planet => planet.id.toString() === this.planet2Id);
    this.route.distance = Number(this.distance);
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

  isPlanet1Id(id: number): boolean {
    return (id === this.route.planet1.id);
  }

  isPlanet2Id(id: number): boolean {
    return (id === this.route.planet2.id);
  }

}