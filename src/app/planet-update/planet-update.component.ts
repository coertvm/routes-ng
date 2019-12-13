import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PlanetsService } from "../planets.service";
import { Planet } from "../planet";

@Component({
  selector: 'app-planet-update',
  templateUrl: './planet-update.component.html',
  styleUrls: ['./planet-update.component.css']
})
export class PlanetUpdateComponent implements OnInit {

  private planet: Planet = new Planet();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private planetsService: PlanetsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.planetsService.readOne(params.get('id'))
        .subscribe((planet: Planet) => {
          this.planet = planet;
        });
    });
  }

  update() : void {
    this.planetsService.update(this.planet, this.planet.id)
      .subscribe((planet: Planet) => {
        this.planet = planet;
        this.router.navigate(['/planet-list']);
      });
  }

  delete(): void {
    this.planetsService.delete(this.planet.id)
      .subscribe(() => {
        this.router.navigate(['/planet-list']);
      });
  }

  cancel() : void {
    this.router.navigate(['/planet-list']);
  }

}