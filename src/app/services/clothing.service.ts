import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClothingService {
  private apiUrl = 'http://localhost:3000/api/clothingitems';

  constructor(private http: HttpClient) {}

  getClothingItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addClothingItem(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
