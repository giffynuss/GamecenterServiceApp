import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { Place } from '../place';
import { Placeservice } from '../placeservice';

interface PCSpecs {
  processor: string;
  graphicsCard: string;
  ram: number;
  storage: string;
  monitor: string;
}

interface Game {
  id: number;
  name: string;
  category: string;
  image: string;
  minSpecs?: PCSpecs;
}

interface BookingDetails {
  placeId: number;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  totalPrice: number;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  birthMonth: number;
  birthYear: number;
  language: string;
  paymentMethod: string;
}

@Component({
  selector: 'app-place-details',
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatSliderModule,
    MatDividerModule
  ],
  templateUrl: './place-details.html',
  styleUrl: './place-details.css'
})
export class PlaceDetails implements OnInit {
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private placeService = inject(Placeservice);

  place: Place | undefined;
  currentStep = 0;
  maxSteps = 5;

  // Form groups for each step
  bookingForm: FormGroup;
  specsForm: FormGroup;
  gamesForm: FormGroup;
  personalForm: FormGroup;
  summaryForm: FormGroup;

  // Data for each step
  selectedSpecs: PCSpecs = {
    processor: '',
    graphicsCard: '',
    ram: 16,
    storage: '',
    monitor: ''
  };

  selectedGames: Game[] = [];
  gameSearchFilter = '';
  selectedCategory = 'all';

  bookingDetails: BookingDetails = {
    placeId: 0,
    date: new Date(),
    startTime: '10:00',
    endTime: '12:00',
    duration: 2,
    totalPrice: 0
  };

  personalInfo: PersonalInfo = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    birthMonth: 1,
    birthYear: 2000,
    language: 'de',
    paymentMethod: 'credit'
  };

  discountCode = '';

  // Available options
  availableSpecs = {
    processors: ['Intel i5-12400F', 'Intel i7-12700K', 'Intel i9-12900K', 'AMD Ryzen 5 5600X', 'AMD Ryzen 7 5800X', 'AMD Ryzen 9 5900X'],
    graphicsCards: ['NVIDIA RTX 3060', 'NVIDIA RTX 3070', 'NVIDIA RTX 3080', 'NVIDIA RTX 4060', 'NVIDIA RTX 4070', 'AMD RX 6600 XT', 'AMD RX 6700 XT', 'AMD RX 7600'],
    ramOptions: [8, 16, 32, 64],
    storageOptions: ['500GB SSD', '1TB SSD', '2TB SSD', '1TB HDD + 500GB SSD'],
    monitors: ['24" 1080p 144Hz', '27" 1440p 144Hz', '32" 4K 144Hz', 'Ultrawide 34" 1440p']
  };

  availableGames: Game[] = [
    { id: 1, name: 'Counter-Strike 2', category: 'fps', image: '🎯' },
    { id: 2, name: 'Valorant', category: 'fps', image: '🔫' },
    { id: 3, name: 'League of Legends', category: 'moba', image: '⚔️' },
    { id: 4, name: 'Dota 2', category: 'moba', image: '🏰' },
    { id: 5, name: 'Fortnite', category: 'battle-royale', image: '🏆' },
    { id: 6, name: 'Apex Legends', category: 'battle-royale', image: '🎪' },
    { id: 7, name: 'World of Warcraft', category: 'mmo', image: '🐉' },
    { id: 8, name: 'Final Fantasy XIV', category: 'mmo', image: '⚡' },
    { id: 9, name: 'Cyberpunk 2077', category: 'rpg', image: '🤖' },
    { id: 10, name: 'The Witcher 3', category: 'rpg', image: '🗡️' },
    { id: 11, name: 'Minecraft', category: 'sandbox', image: '🧱' },
    { id: 12, name: 'Grand Theft Auto V', category: 'action', image: '🚗' },
    { id: 13, name: 'Red Dead Redemption 2', category: 'action', image: '🤠' },
    { id: 14, name: 'FIFA 24', category: 'sports', image: '⚽' },
    { id: 15, name: 'NBA 2K24', category: 'sports', image: '🏀' },
    { id: 16, name: 'Rocket League', category: 'sports', image: '🚀' }
  ];

  gameCategories = [
    { value: 'all', label: 'Alle Spiele' },
    { value: 'fps', label: 'Shooter' },
    { value: 'moba', label: 'MOBA' },
    { value: 'battle-royale', label: 'Battle Royale' },
    { value: 'mmo', label: 'MMO' },
    { value: 'rpg', label: 'RPG' },
    { value: 'sandbox', label: 'Sandbox' },
    { value: 'action', label: 'Action' },
    { value: 'sports', label: 'Sport' }
  ];

  languages = [
    { value: 'de', label: 'Deutsch' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'es', label: 'Español' }
  ];

  paymentMethods = [
    { value: 'credit', label: 'Kreditkarte' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'cash', label: 'Bar im Center' }
  ];

  timeSlots: string[] = [];

  constructor() {
    // Initialize forms
    this.bookingForm = this.formBuilder.group({
      date: [new Date(), Validators.required],
      startTime: ['10:00', Validators.required],
      endTime: ['12:00', Validators.required]
    });

    this.specsForm = this.formBuilder.group({
      processor: ['', Validators.required],
      graphicsCard: ['', Validators.required],
      ram: [16, Validators.required],
      storage: ['', Validators.required],
      monitor: ['', Validators.required]
    });

    this.gamesForm = this.formBuilder.group({
      selectedGames: [[]]
    });

    this.personalForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthMonth: [1, Validators.required],
      birthYear: [2000, Validators.required],
      language: ['de', Validators.required],
      paymentMethod: ['credit', Validators.required]
    });

    this.summaryForm = this.formBuilder.group({
      discountCode: [''],
      agreeToTerms: [false, Validators.requiredTrue]
    });

    // Generate time slots
    this.generateTimeSlots();
  }

  ngOnInit() {
    const placeId = Number(this.route.snapshot.paramMap.get('id'));
    this.place = this.placeService.getPlaces().find(p => p.id === placeId);
    
    if (!this.place) {
      this.router.navigate(['/places']);
      return;
    }

    this.bookingDetails.placeId = placeId;
    this.updateTotalPrice();
  }

  generateTimeSlots() {
    const slots = [];
    for (let hour = 10; hour <= 28; hour++) { // 28 = 4 AM next day
      const displayHour = hour > 24 ? hour - 24 : hour;
      const timeString = `${displayHour.toString().padStart(2, '0')}:00`;
      slots.push(timeString);
    }
    this.timeSlots = slots;
  }

  nextStep() {
    if (this.currentStep < this.maxSteps - 1) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  onBookingFormChange() {
    const startTime = this.bookingForm.get('startTime')?.value;
    const endTime = this.bookingForm.get('endTime')?.value;
    
    if (startTime && endTime) {
      this.bookingDetails.startTime = startTime;
      this.bookingDetails.endTime = endTime;
      this.calculateDuration();
      this.updateTotalPrice();
    }
  }

  calculateDuration() {
    const start = this.parseTime(this.bookingDetails.startTime);
    let end = this.parseTime(this.bookingDetails.endTime);
    
    // Handle overnight bookings
    if (end <= start) {
      end += 24;
    }
    
    this.bookingDetails.duration = end - start;
  }

  parseTime(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours + minutes / 60;
  }

  updateTotalPrice() {
    if (this.place) {
      const basePrice = this.place.price || 5; // 5€ per hour default
      this.bookingDetails.totalPrice = basePrice * this.bookingDetails.duration;
    }
  }

  onSpecsChange() {
    this.selectedSpecs = {
      processor: this.specsForm.get('processor')?.value,
      graphicsCard: this.specsForm.get('graphicsCard')?.value,
      ram: this.specsForm.get('ram')?.value,
      storage: this.specsForm.get('storage')?.value,
      monitor: this.specsForm.get('monitor')?.value
    };
  }

  toggleGameSelection(game: Game) {
    const index = this.selectedGames.findIndex(g => g.id === game.id);
    if (index === -1) {
      this.selectedGames.push(game);
    } else {
      this.selectedGames.splice(index, 1);
    }
  }

  isGameSelected(game: Game): boolean {
    return this.selectedGames.some(g => g.id === game.id);
  }

  getFilteredGames(): Game[] {
    let filtered = this.availableGames;
    
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(game => game.category === this.selectedCategory);
    }
    
    if (this.gameSearchFilter) {
      filtered = filtered.filter(game => 
        game.name.toLowerCase().includes(this.gameSearchFilter.toLowerCase())
      );
    }
    
    return filtered;
  }

  getCategoryLabel(categoryValue: string): string {
    const category = this.gameCategories.find(c => c.value === categoryValue);
    return category ? category.label : categoryValue;
  }

  getPaymentMethodLabel(methodValue: string): string {
    const method = this.paymentMethods.find(m => m.value === methodValue);
    return method ? method.label : methodValue;
  }

  formatRAMLabel(value: number): string {
    return `${value} GB`;
  }

  onPersonalFormChange() {
    this.personalInfo = {
      firstName: this.personalForm.get('firstName')?.value,
      lastName: this.personalForm.get('lastName')?.value,
      username: this.personalForm.get('username')?.value,
      email: this.personalForm.get('email')?.value,
      birthMonth: this.personalForm.get('birthMonth')?.value,
      birthYear: this.personalForm.get('birthYear')?.value,
      language: this.personalForm.get('language')?.value,
      paymentMethod: this.personalForm.get('paymentMethod')?.value
    };
  }

  applyDiscountCode() {
    const code = this.summaryForm.get('discountCode')?.value?.toLowerCase();
    if (!code) return;
    
    let discount = 0;
    
    switch (code) {
      case 'student':
        discount = 0.1; // 10%
        break;
      case 'firsttime':
        discount = 0.15; // 15%
        break;
      case 'weekend':
        discount = 0.05; // 5%
        break;
    }
    
    if (discount > 0) {
      const originalPrice = (this.place?.price || 5) * this.bookingDetails.duration;
      this.bookingDetails.totalPrice = originalPrice * (1 - discount);
    }
  }

  confirmBooking() {
    if (this.summaryForm.valid) {
      // Here you would typically send the booking data to a service
      console.log('Booking confirmed:', {
        place: this.place,
        booking: this.bookingDetails,
        specs: this.selectedSpecs,
        games: this.selectedGames,
        personal: this.personalInfo,
        discount: this.summaryForm.get('discountCode')?.value
      });
      
      // Show success message or navigate to confirmation page
      alert('Buchung erfolgreich! Sie erhalten eine Bestätigungsmail.');
      this.router.navigate(['/places']);
    }
  }

  getCurrentStepTitle(): string {
    const titles = [
      'Platz-Details & Zeit',
      'PC-Ausstattung',
      'Spiele-Auswahl',
      'Persönliche Daten',
      'Buchung bestätigen'
    ];
    return titles[this.currentStep] || '';
  }

  isCurrentStepValid(): boolean {
    switch (this.currentStep) {
      case 0:
        return this.bookingForm.valid;
      case 1:
        return this.specsForm.valid;
      case 2:
        return true; // Games are optional
      case 3:
        return this.personalForm.valid;
      case 4:
        return this.summaryForm.valid;
      default:
        return false;
    }
  }
}