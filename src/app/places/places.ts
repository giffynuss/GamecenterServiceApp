import { Component, inject } from '@angular/core';
import { Place } from '../place';
import { Placeservice } from '../placeservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-places',
  imports: [CommonModule],
  templateUrl: './places.html',
  styleUrl: './places.css'
})
export class Places {

  place: Place | null = null;
  places: Place[] = [];
  personService: Placeservice = inject(Placeservice);

  constructor() {
    this.places = this.personService.getPlaces();
  }

  toggleOccupation(place: Place) {
   place.occupation = !place.occupation;
  }

}
