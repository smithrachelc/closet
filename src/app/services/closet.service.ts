import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClosetService {
  private base = `${environment.apiUrl}/closet`;

  constructor(private http: HttpClient) { }

  getAllItems() {
    return this.http.get(`${this.base}/items`);
  }

  addItem(formData: FormData) {
    return this.http.post(`${this.base}/upload`, formData);
  }

  deleteItem(id: string) {
    return this.http.delete(`${this.base}/items/${id}`);
  }
}
