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
    return this.http.get<Uplata>(`https://localhost:9092/placanje/proveriUrl/` + paymentUrl + `/` + paymentId);
  }

  invalidirajLink(uplataId: number): Observable<any> {
    return this.http.get<any>(`https://localhost:9092/placanje/invalidirajLink/` + uplataId);
  }

  posaljiTransakciju(transakcija: Transakcija, bankaPort: string): Observable<any> {
    return this.http.post<any>(`https://localhost:` + bankaPort + `/placanje/proveriPodatke/`, transakcija);
  }
}
