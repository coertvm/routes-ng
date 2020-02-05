import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShortestRouteService } from '../shortest-route.service';
import { Route } from '../route';
import { PlanetsService } from "../planets.service";
import { Planet } from "../planet";

@Component({
  selector: 'app-shortest-route',
  templateUrl: './shortest-route.component.html',
  styleUrls: ['./shortest-route.component.css']
})
export class ShortestRouteComponent implements OnInit {

  private route: Route = new Route();
  private routes: Route[] = [];
  private planets: Planet[] = [];

  constructor(
    private router: Router,
    private shortestRouteService: ShortestRouteService,
    private planetsService: PlanetsService
  ) { }

  ngOnInit() {
    this.route = new Route();
    this.routes = [];
    this.planetsService.readAll()
      .subscribe((planets: Planet[]) => {
        this.planets = planets;
      });
  }

  find(): void {
    this.shortestRouteService.getRoutes(this.route)
      .subscribe((routes: Route[]) => {
        this.routes = routes;
      });
  }

}