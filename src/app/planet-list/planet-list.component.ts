import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanetsService } from '../planets.service';
import { Planet } from '../planet';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent implements OnInit {

  private planets: Planet[] = [];

  constructor(
    private router: Router,
    private planetsService: PlanetsService
  ) { }

  ngOnInit() {
    this.planetsService.readAll()
      .subscribe((planets: Planet[]) => {
        this.planets = planets;
      });
  }

  create(): void {
    this.router.navigate(['/planet-create']);
  }

}