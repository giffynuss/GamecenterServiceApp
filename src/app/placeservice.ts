import { Injectable } from '@angular/core';
import { Place } from './place';

export enum PriceClass {
  LOW_COST = 'LOW_COST',
  MID_CLASS = 'MID_CLASS', 
  HIGH_END = 'HIGH_END'
}

export interface PriceClassInfo {
  class: PriceClass;
  name: string;
  price: number;
  description: string;
  color: string;
  rows: string;
}

@Injectable({
  providedIn: 'root'
})
export class Placeservice {
  places: Place[] = [];
  
  // Preisklassen-Definitionen
  priceClasses: PriceClassInfo[] = [
    {
      class: PriceClass.LOW_COST,
      name: 'Budget Gaming',
      price: 2.50,
      description: 'Günstige Plätze mit solider Ausstattung',
      color: '#2196F3',
      rows: 'Reihe 1'
    },
    {
      class: PriceClass.MID_CLASS,
      name: 'Premium Gaming',
      price: 4.00,
      description: 'Beste Balance aus Preis und Performance',
      color: '#FF9800',
      rows: 'Reihe 2-3'
    },
    {
      class: PriceClass.HIGH_END,
      name: 'Elite Gaming',
      price: 6.50,
      description: 'Top-Hardware für das ultimative Gaming-Erlebnis',
      color: '#9C27B0',
      rows: 'Reihe 4'
    }
  ];

  constructor() {
    this.initializePlaces();
  }

  private initializePlaces(): void {
    this.places = [
      // Reihe 1: Low Cost (Plätze 1-5)
      { id: 1, price: 2.50, occupation: false },
      { id: 2, price: 2.50, occupation: true }, // Beispiel für belegten Platz
      { id: 3, price: 2.50, occupation: false },
      { id: 4, price: 2.50, occupation: false },
      { id: 5, price: 2.50, occupation: false },
      
      // Reihe 2: Mid Class (Plätze 6-10)
      { id: 6, price: 4.00, occupation: false },
      { id: 7, price: 4.00, occupation: false },
      { id: 8, price: 4.00, occupation: true }, // Beispiel für belegten Platz
      { id: 9, price: 4.00, occupation: false },
      { id: 10, price: 4.00, occupation: false },
      
      // Reihe 3: Mid Class (Plätze 11-15)
      { id: 11, price: 4.00, occupation: false },
      { id: 12, price: 4.00, occupation: false },
      { id: 13, price: 4.00, occupation: false },
      { id: 14, price: 4.00, occupation: false },
      { id: 15, price: 4.00, occupation: true }, // Beispiel für belegten Platz
      
      // Reihe 4: High End (Plätze 16-20)
      { id: 16, price: 6.50, occupation: false },
      { id: 17, price: 6.50, occupation: false },
      { id: 18, price: 6.50, occupation: false },
      { id: 19, price: 6.50, occupation: false },
      { id: 20, price: 6.50, occupation: false },
    ];
  }

  getPlaces(): Place[] {
    return this.places;
  }

  getPriceClasses(): PriceClassInfo[] {
    return this.priceClasses;
  }

  getPriceClassForPlace(placeId: number): PriceClassInfo | undefined {
    if (placeId >= 1 && placeId <= 5) {
      return this.priceClasses.find(pc => pc.class === PriceClass.LOW_COST);
    } else if (placeId >= 6 && placeId <= 15) {
      return this.priceClasses.find(pc => pc.class === PriceClass.MID_CLASS);
    } else if (placeId >= 16 && placeId <= 20) {
      return this.priceClasses.find(pc => pc.class === PriceClass.HIGH_END);
    }
    return undefined;
  }

  getPlaceById(id: number): Place | undefined {
    return this.places.find(place => place.id === id);
  }
}