import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor(private router: Router) {}

  /**
   * Navigation zum Login
   */
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Navigation zu Places
   */
  navigateToPlaces(): void {
    this.router.navigate(['/places']);
  }
}