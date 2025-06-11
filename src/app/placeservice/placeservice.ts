import { Component } from '@angular/core';
import { Place } from '../place';

@Component({
  selector: 'app-placeservice',
  imports: [],
  templateUrl: './placeservice.html',
  styleUrl: './placeservice.css'
})
export class Placeservice {
  places: Place [] = [];
  
    constructor() {
      this.places = [
        { id: 1, price: 0, occupation: false,},
        { id: 2, price: 0, occupation: false },
        { id: 3, price: 0, occupation: false },
        { id: 4, price: 0, occupation: false },
        { id: 5, price: 0, occupation: false }
      ];
    }

  getPlaces(): Place[] {
    return this.places;
  }
}
