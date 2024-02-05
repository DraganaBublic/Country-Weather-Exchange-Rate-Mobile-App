import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CountryService } from '../services/country.service';
import { WeatherService } from '../services/weather.service';
import { CommonModule } from '@angular/common';
import { CurrencyConverter } from '../currency-converter/currency-converter';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.page.html',
  styleUrls: ['./country-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CurrencyConverter],
})
export class CountryDetailsPage implements OnInit {
  countryDetails: any = {};
  attributeNames: string[] = [];
  amount: number = 0;
  baseCurrency: string = '';
  convertedAmount: number = 0;
  isButtonDisabled: boolean = true;
  currency: string = '';

  constructor(
    private cs: CountryService,
    private ws: WeatherService,
    private exchangeRateService: ExchangeRateService,
    private converter: CurrencyConverter
  ) {}

  // Lifecycle hook when component is initialized
  ngOnInit() {}

  // Lifecycle hook when the view is about to be entered
  ionViewWillEnter() {
    this.getCountryDetails();
  }

  // Method to fetch country details
  async getCountryDetails() {
    this.countryDetails = await this.cs.get('selectedCountry');
    this.attributeNames = Object.keys(this.countryDetails);
    console.log(this.countryDetails);

    // Set baseCurrency to the first currency code if available
    if (this.countryDetails.currencies) {
      const currencyCodes = Object.keys(this.countryDetails.currencies);
      if (currencyCodes.length > 0) {
        this.baseCurrency = currencyCodes[0];
      }
    }

    // Fetch weather data using the coordinates from the selected country
    if (this.countryDetails.capitalInfo && this.countryDetails.capitalInfo.latlng) {
      const latlng = this.countryDetails.capitalInfo.latlng;
      const latitude = latlng[0];
      const longitude = latlng[1];
     

      // Fetch weather data
      this.ws.getWeatherData(latlng).then((weatherData: any) => {
        console.log('Weather API Response:', weatherData);
        this.countryDetails.weatherDescription = weatherData.data.description;
      });
    } else {
      console.log('latlng is not defined or has an incorrect structure.');
    }
  }

  // Method to get currencies from the given object
  getCurrencies(currencies: any): string[] {
    if (currencies) {
      return Object.keys(currencies);
    }
    return [];
  }

  // Method to get the symbol of the first currency
  getFirstCurrencySymbol(currencies: any): string | undefined {
    const currencyCodes = this.getCurrencies(currencies);
    if (currencyCodes.length > 0) {
      const firstCurrencyCode = currencyCodes[0];
      return currencies[firstCurrencyCode].symbol;
    }
    return undefined;
  }

  // Method to convert currency
  convertCurrency() {
    this.converter.convertToEUR();
  }

  // Method to handle amount change
  onAmountChange(event: number) {
    this.amount = event;
    this.isButtonDisabled = !this.amount;
  }

  // Method to convert currency to EUR
  convertToEUR() {
    this.exchangeRateService.getExchangeRate(this.baseCurrency).then((response: any) => {
      const rate = response.data.conversion_rates.EUR;
      this.convertedAmount = this.amount * rate;
    });
  }

  // Method to convert currency using the converter service
  convertCurrencyWithConverter() {
    if (this.amount && this.baseCurrency) {
      // Create a new instance of CurrencyConverter
      const converter = new CurrencyConverter(this.exchangeRateService);

      // Use the CurrencyConverter methods
      converter.setAmount(this.amount);
      converter.setBaseCurrency(this.baseCurrency);

      // Call the conversion method
      const conversionPromise = converter.convertToEUR();

      // Handle the promise
      conversionPromise
        .then((result: number) => {
          // Use the result as needed
          console.log('Converted Amount:', result);
          this.convertedAmount = result; 
        })
        .catch((error: any) => {
          console.error('Error during conversion:', error);
        });
    } else {
      console.error('Amount or baseCurrency is not provided.');
    }
  }

  // Method to get languages from the given object
  getLanguages(languages: any): string[] {
    if (languages) {
      return Object.keys(languages).map((key) => languages[key]);
    }
    return [];
  }
}
