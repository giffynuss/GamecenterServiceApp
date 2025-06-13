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
  url = "http://localhost:3000/seats"
  
  priceClasses: PriceClassInfo[] = [
    {
      class: PriceClass.LOW_COST,
      name: 'Budget Gaming',
      price: 2.50,
      description: 'Günstige Plätze mit solider Ausstattung',
      color: '#2196F3',
      rows: 'Reihe 1-3'
    },
    {
      class: PriceClass.MID_CLASS,
      name: 'Premium Gaming',
      price: 4.00,
      description: 'Beste Balance aus Preis und Performance',
      color: '#FF9800',
      rows: 'Reihe 4-6'
    },
    {
      class: PriceClass.HIGH_END,
      name: 'Elite Gaming',
      price: 6.50,
      description: 'Top-Hardware für das ultimative Gaming-Erlebnis',
      color: '#9C27B0',
      rows: 'Reihe 7-8'
    }
  ];

  constructor() {
  }

  async getPlaceHTTP(): Promise<Place[]>{
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }


  getPlaces(): Place[] {
    return this.places;
  }

  getPriceClasses(): PriceClassInfo[] {
    return this.priceClasses;
  }

  getPriceClassForPlace(placeId: number): PriceClassInfo | undefined {
    if (placeId >= 1 && placeId <= 15) {
      return this.priceClasses.find(pc => pc.class === PriceClass.LOW_COST);
    } else if (placeId >= 16 && placeId <= 30) {
      return this.priceClasses.find(pc => pc.class === PriceClass.MID_CLASS);
    } else if (placeId >= 31 && placeId <= 40) {
      return this.priceClasses.find(pc => pc.class === PriceClass.HIGH_END);
    }
    return undefined;
  }

  getPlaceById(id: number): Place | undefined {
    return this.places.find(place => place.id === id);
  }
}