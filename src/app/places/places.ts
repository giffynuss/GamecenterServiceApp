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
    this.places = this.placeService.getPlaces();
    this.priceClasses = this.placeService.getPriceClasses();
  }

  /**
   * Navigiert zur Detail-Seite des ausgewählten Platzes
   * Nur möglich wenn der Platz nicht belegt ist
   * @param place Der ausgewählte Platz
   */
  selectPlace(place: Place): void {
    if (place.occupation) {
      // Platz ist belegt - keine Aktion
      return;
    }
    
    // Navigation zur Detail-Seite mit der Platz-ID
    this.router.navigate(['/place-details', place.id]);
  }

  /**
   * Prüft ob ein Platz auswählbar ist (nicht belegt)
   * @param place Der zu prüfende Platz
   */
  isPlaceSelectable(place: Place): boolean {
    return !place.occupation;
  }

  /**
   * Gibt die Preisklasse für einen Platz zurück
   * @param placeId Die Platz-ID
   */
  getPriceClassForPlace(placeId: number): PriceClassInfo | undefined {
    return this.placeService.getPriceClassForPlace(placeId);
  }

  /**
   * Gibt die CSS-Klasse für eine Preisklasse zurück
   * @param placeId Die Platz-ID
   */
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

  /**
   * Gibt die Anzahl der freien Plätze zurück
   */
  getFreePlacesCount(): number {
    return this.places.filter(place => !place.occupation).length;
  }

  /**
   * Gibt die Anzahl der belegten Plätze zurück
   */
  getOccupiedPlacesCount(): number {
    return this.places.filter(place => place.occupation).length;
  }

  /**
   * Prüft ob alle Plätze belegt sind
   */
  areAllPlacesOccupied(): boolean {
    return this.places.every(place => place.occupation);
  }

  /**
   * Formatiert den Preis für die Anzeige
   * @param price Der Preis
   */
  formatPrice(price: number): string {
    return `${price.toFixed(2)}€/h`;
  }
}