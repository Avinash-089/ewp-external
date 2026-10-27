
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FacilityRequest {
  _id?: string;
  name: string;
  department: string;
  facility: string;
  description: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'http://localhost:5000/api/requests';

  constructor(private http: HttpClient) {}

  getRequests(): Observable<FacilityRequest[]> {
    return this.http.get<FacilityRequest[]>(this.apiUrl);
  }

  addRequest(request: FacilityRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }
}
