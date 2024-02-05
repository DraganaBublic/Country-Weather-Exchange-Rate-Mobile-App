import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
  }

  // Initialize Ionic Storage
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Get exchange rate data from exchangerate-api.com
  public async getExchangeRate(baseCurrency: string) {
    const apiUrl = `https://v6.exchangerate-api.com/v6/26b0751315414bc95d3bcf80/latest/${baseCurrency}`;

    // Make the API request using CapacitorHttp
    return await CapacitorHttp.get({ url: apiUrl });
  }

  // Set a key-value pair in Ionic Storage
  async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  // Get the value associated with a key from Ionic Storage
  async get(key: string) {
    return await this._storage?.get(key);
  }
}
