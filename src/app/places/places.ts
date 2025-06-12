import { Component, inject } from '@angular/core';
import { Place } from '../place';
import { Placeservice } from '../placeservice';

@Component({
  selector: 'app-places',
  imports: [],
  templateUrl: './places.html',
  styleUrl: './places.css'
})
export class Places {

  places: Place[] = [];
  personService: Placeservice = inject(Placeservice);

  constructor() {
    this.places = this.personService.getPlaces();
  }

}
