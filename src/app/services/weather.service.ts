import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
  }

  // Initialize Ionic Storage
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Get weather data from Visual Crossing API
  public async getWeatherData(latlng: number[]) {
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latlng[0]},${latlng[1]}`;

    const apiKey = '6LGF5TRJ2HYFDBPH6YKE8FWTC'; 
    const queryParams = `key=${apiKey}`;

    // Make the API request using CapacitorHttp
    return await CapacitorHttp.get({ url: apiUrl + '?' + queryParams });
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
