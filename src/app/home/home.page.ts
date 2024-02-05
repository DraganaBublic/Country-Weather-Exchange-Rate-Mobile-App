import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CountryService } from '../services/country.service';
import { HttpOptions } from '@capacitor/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})


export class HomePage {
  darkMode: boolean = false;
  countryData: any[] = [];
  filteredCountryData: any[] = [];
  searchTerm: string = '';

  options: HttpOptions = {
    url: 'https://restcountries.com/v3.1/all',
  };

  constructor(private mhs: CountryService, private router: Router, private cs: CountryService, private cdr: ChangeDetectorRef) {}
  
  // Lifecycle hook - called when the component is about to be displayed

  ionViewWillEnter() {
    this.getCountryData();
  }
  // Private method to fetch country data asynchronously

  private async getCountryData() {
    let result = await this.mhs.getCountries(this.options);
    this.countryData = result.data;
    this.filteredCountryData = [...this.countryData];
  }
  // Method to navigate to country details page

  openCountryDetails(country: any) {
    this.cs.set('selectedCountry', country);
    this.router.navigate(['/country-details']);
  }
    // Method to handle search bar input change

  onSearchChange(event: any) {
    const searchTerm = event.detail.value.toLowerCase();
    this.filteredCountryData = this.countryData.filter(
      (country) => country.name.official.toLowerCase().includes(searchTerm)
    );
  }
 
    }

