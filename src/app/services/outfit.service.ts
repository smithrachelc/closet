import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutfitService {
  private base = `${environment.apiUrl}/outfit`;

  // Exposed as an Observable for your component to subscribe to:
  public publicOutfits$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  /** Internal fetcher, returns the raw HTTP Observable */
  private fetchPublicOutfits() {
    return this.http.get<any[]>(`${this.base}/public`);
  }

  /** Called by PublicOutfitsComponent to trigger a data-load */
  refreshPublicOutfits(): void {
    this.fetchPublicOutfits().subscribe({
      next: outfits => this.publicOutfits$.next(outfits),
      error: err => {
        console.error('Failed to load public outfits', err);
        this.publicOutfits$.error(err);
      }
    });
  }

  /** If any component needs the raw Observable directly */
  getPublicOutfits() {
    return this.fetchPublicOutfits();
  }

  /** Your other API methods… */
  createOutfit(name: string, items: any[]) {
    return this.http.post(`${this.base}/create`, { name, items });
  }

  getMyOutfits() {
    return this.http.get(`${this.base}/mine`);
  }
}
