/**import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClosetService {
  private clothingItems = new BehaviorSubject<any[]>(this.getSavedClothing());
  clothingItems$ = this.clothingItems.asObservable();

  constructor() {}

  // ✅ Check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  private getSavedClothing(): any[] {
    if (this.isLocalStorageAvailable()) {
      return JSON.parse(localStorage.getItem('clothingItems') || '[]');
    }
    return []; // Return empty array if localStorage is not available
  }

  private saveClothingToStorage(items: any[]) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('clothingItems', JSON.stringify(items));
      this.clothingItems.next(items);
    }
  }

  addClothingItem(item: any) {
    const updatedClothing = [...this.clothingItems.getValue(), item];
    this.saveClothingToStorage(updatedClothing);
  }
}*/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClosetService {
  private clothingItems = new BehaviorSubject<any[]>(this.getSavedClothing());
  clothingItems$ = this.clothingItems.asObservable();

  constructor() {}

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  private getSavedClothing(): any[] {
    if (this.isLocalStorageAvailable()) {
      return JSON.parse(localStorage.getItem('clothingItems') || '[]');
    }
    return [];
  }

  private saveClothingToStorage(items: any[]) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('clothingItems', JSON.stringify(items));
      this.clothingItems.next(items);
    }
  }

  addClothingItem(item: any) {
    const updatedClothing = [...this.clothingItems.getValue(), item];
    this.saveClothingToStorage(updatedClothing);
  }

  deleteClothingItem(itemName: string) {
    const updatedClothing = this.clothingItems.getValue().filter(item => item.name !== itemName);
    this.saveClothingToStorage(updatedClothing);
  }
}
