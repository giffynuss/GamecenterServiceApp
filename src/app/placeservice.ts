import { Injectable } from '@angular/core';
import { Place } from './place';

@Injectable({
  providedIn: 'root'
})
export class Placeservice {

    places: Place [] = [];
  
    constructor() {
      this.places = [
        { id: 1, price: 0, occupation: false },
        { id: 2, price: 0, occupation: false },
        { id: 3, price: 0, occupation: false },
        { id: 4, price: 0, occupation: false },
        { id: 5, price: 0, occupation: false },
        { id: 6, price: 0, occupation: false },
        { id: 7, price: 0, occupation: false },
        { id: 8, price: 0, occupation: false },
        { id: 9, price: 0, occupation: false },
        { id: 10, price: 0, occupation: false },
        { id: 11, price: 0, occupation: false },
        { id: 12, price: 0, occupation: false },
        { id: 13, price: 0, occupation: false },
        { id: 14, price: 0, occupation: false },
        { id: 15, price: 0, occupation: false },
        { id: 16, price: 0, occupation: false },
        { id: 17, price: 0, occupation: false },
        { id: 18, price: 0, occupation: false },
        { id: 19, price: 0, occupation: false },
        { id: 20, price: 0, occupation: false },
      ];
    }

  getPlaces(): Place[] {
    return this.places;
  }
}
