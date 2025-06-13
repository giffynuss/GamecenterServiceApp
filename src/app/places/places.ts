import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Place } from '../place';
import { Placeservice, PriceClassInfo } from '../placeservice';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-places',
  imports: [CommonModule, RouterLink],
  templateUrl: './places.html',
  styleUrl: './places.css'
})
export class Places {
  place: Place | null = null;
  places: Place[] = [];
  priceClasses: PriceClassInfo[] = [];
  placeService: Placeservice = inject(Placeservice);
  router: Router = inject(Router);

  constructor() {
    this.placeService.getPlaceHTTP().then((place: Place[]) => {
      this.places = place;
    });
    this.priceClasses = this.placeService.getPriceClasses();
  }

  selectPlace(place: Place): void {
    if (place.occupation) {
      return;
    }
    
    this.router.navigate(['/place-details', place.id]);
  }

  isPlaceSelectable(place: Place): boolean {
    return !place.occupation;
  }

  getPriceClassForPlace(placeId: number): PriceClassInfo | undefined {
    return this.placeService.getPriceClassForPlace(placeId);
  }

  getPriceClassCssClass(placeId: number): string {
    const priceClass = this.getPriceClassForPlace(placeId);
    if (!priceClass) return '';
    
    switch (priceClass.class) {
      case 'LOW_COST': return 'low-cost';
      case 'MID_CLASS': return 'mid-class';
      case 'HIGH_END': return 'high-end';
      default: return '';
    }
  }

  getFreePlacesCount(): number {
    return this.places.filter(place => !place.occupation).length;
  }

  getOccupiedPlacesCount(): number {
    return this.places.filter(place => place.occupation).length;
  }

  areAllPlacesOccupied(): boolean {
    return this.places.every(place => place.occupation);
  }

  formatPrice(price: number): string {
    return `${price.toFixed(2)}€/h`;
  }
}