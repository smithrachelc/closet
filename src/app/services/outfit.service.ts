import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutfitService {
  private publicOutfitsSubject = new BehaviorSubject<any[]>(this.getPublicOutfitsFromStorage());
  publicOutfits$ = this.publicOutfitsSubject.asObservable();

  private getPublicOutfitsFromStorage(): any[] {
    return JSON.parse(localStorage.getItem('publicOutfits') || '[]');
  }

  refreshPublicOutfits() {
    const updated = this.getPublicOutfitsFromStorage();
    this.publicOutfitsSubject.next(updated);
  }
}
