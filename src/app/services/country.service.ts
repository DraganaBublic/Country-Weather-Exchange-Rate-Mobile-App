import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
  }

  // Initialize Ionic Storage
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Get country information from the specified API endpoint
  public async getCountries(options: HttpOptions) {
    return await CapacitorHttp.get(options);
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
