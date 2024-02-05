import { Component, Input } from '@angular/core';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.html',
  styleUrls: [],
  standalone: true,
})
@Injectable({
  providedIn: 'root',
})
export class CurrencyConverter {
  @Input() amount: number = 0;
  baseCurrency: string = 'USD';
  convertedAmount: number = 0;
  isButtonDisabled: boolean = true;

  constructor(private exchangeRateService: ExchangeRateService) {}

  // Method to handle amount change
  onAmountChange() {
    this.isButtonDisabled = !this.amount;
  }

  // Method to convert to EUR and return a promise
  convertToEUR(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.exchangeRateService
        .getExchangeRate(this.baseCurrency)
        .then((response: any) => {
          const rate = response.data.conversion_rates.EUR;
          const convertedAmount = this.amount * rate;
          resolve(convertedAmount);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  // Method to set the amount and update button status
  setAmount(amount: number) {
    this.amount = amount;
    this.onAmountChange(); // Update button status
  }

  // Method to set the base currency and update button status
  setBaseCurrency(baseCurrency: string) {
    this.baseCurrency = baseCurrency;
    this.onAmountChange(); // Update button status
  }
}
