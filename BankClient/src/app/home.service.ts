import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Uplata } from './model/Uplata';
import { Transakcija } from './model/Transakcija';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  proveriUrl(paymentUrl: string, paymentId: string): Observable<Uplata> {
    return this.http.get<Uplata>(`http://localhost:9092/placanje/proveriUrl/` + paymentUrl + `/` + paymentId);
  }

  posaljiTransakciju(transakcija: Transakcija): Observable<any> {
    return this.http.post<any>(`http://localhost:9092/placanje/proveriPodatke/`, transakcija);
  }
}
