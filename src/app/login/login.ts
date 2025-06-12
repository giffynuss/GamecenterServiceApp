import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginData: LoginData = {
    email: '',
    password: '',
    rememberMe: false
  };

  showPassword: boolean = false;
  isLoading: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  /**
   * Behandelt das Login-Formular
   */
  onLogin(): void {
    this.showError = false;
    this.errorMessage = '';

    // Validierung
    if (!this.loginData.email || !this.loginData.password) {
      this.showError = true;
      this.errorMessage = 'Bitte fülle alle Pflichtfelder aus.';
      return;
    }

    this.isLoading = true;

    // Simuliere API-Aufruf mit Delay
    setTimeout(() => {
      // Demo-Login: admin@gamecenter.de / admin123
      if (this.loginData.email === 'admin@gamecenter.de' && 
          this.loginData.password === 'admin123') {
        
        // Erfolgreiche Anmeldung
        console.log('Login erfolgreich!');
        
        // Optional: Login-Daten speichern (vereinfacht)
        if (this.loginData.rememberMe) {
          sessionStorage.setItem('gamecenter_user', JSON.stringify({
            email: this.loginData.email,
            loginTime: new Date().toISOString()
          }));
        }

        // Weiterleitung zur Places-Seite
        this.router.navigate(['/places']);
        
      } else {
        // Fehlgeschlagene Anmeldung
        this.errorMessage = 'Ungültige Anmeldedaten. Versuche es mit admin@gamecenter.de / admin123';
        this.showError = true;
      }
      
      this.isLoading = false;
    }, 1500); // Simuliere Netzwerk-Delay
  }

  /**
   * Zeigt/versteckt das Passwort
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Steam Login (Demo)
   */
  loginWithSteam(): void {
    console.log('Steam Login angefordert');
    // Hier würde normalerweise die Steam OAuth Integration stehen
    alert('Steam Login ist in der Demo nicht verfügbar. Nutze admin@gamecenter.de / admin123');
  }

  /**
   * Discord Login (Demo)
   */
  loginWithDiscord(): void {
    console.log('Discord Login angefordert');
    // Hier würde normalerweise die Discord OAuth Integration stehen
    alert('Discord Login ist in der Demo nicht verfügbar. Nutze admin@gamecenter.de / admin123');
  }

  /**
   * Navigation zurück zur Home-Seite
   */
  goBack(): void {
    this.router.navigate(['/home']);
  }
}