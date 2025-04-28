import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClothingService {
  private base = `${environment.apiUrl}/clothing`;

  constructor(private http: HttpClient) { }

  /** Used by ClosetDashboardComponent */
  getClothingItems(category?: string): Observable<any[]> {
    // if a category is passed, call /category/:category
    if (category) {
      return this.http.get<any[]>(`${this.base}/category/${category}`);
    }
    // otherwise list all
    return this.http.get<any[]>(`${this.base}/all`);
  }

  /** Used by UploadClothingComponent */
  addClothingItem(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.base}/upload`, formData);
  }
}
