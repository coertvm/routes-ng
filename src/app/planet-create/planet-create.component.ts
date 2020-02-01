import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanetsService } from "../planets.service";
import { Planet } from "../planet";

@Component({
  selector: 'app-planet-create',
  templateUrl: './planet-create.component.html',
  styleUrls: ['./planet-create.component.css']
})
export class PlanetCreateComponent implements OnInit {

  private planet: Planet = new Planet();

  constructor(
    private router: Router,
    private planetsService: PlanetsService
  ) { }

  ngOnInit() {
    this.planet = new Planet();
  }

  create() : void {
    this.planetsService.create(this.planet)
      .subscribe((planet: Planet) => {
        this.planet = planet;
        this.router.navigate(['/planet-list']);
      });
  }

  cancel() : void {
    this.router.navigate(['/planet-list']);
  }

}