import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesService } from '../routes.service';
import { Route } from '../route';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  private routes: Route[] = [];

  constructor(
    private router: Router,
    private routesService: RoutesService
  ) { }

  ngOnInit() {
    this.routesService.readAll()
      .subscribe((routes: Route[]) => {
        this.routes = routes;
      });
  }

  create(): void {
    this.router.navigate(['/route-create']);
  }

}