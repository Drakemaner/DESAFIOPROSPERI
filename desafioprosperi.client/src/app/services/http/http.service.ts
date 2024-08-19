import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }

  private readonly apiURL = "https://localhost:7198/api"

  GetAll<T>(type : string) : Observable<T[]> {
    return this.http.get<T[]>(`${this.apiURL}/${type}`)
  }

  GetOne<T>(type : string, numOs : number) : Observable<T> {
    return this.http.get<T>(`${this.apiURL}/${type}/${numOs}`)
  }

  Post<T>(type : string, obj : T) {
    return this.http.post<T>(`${this.apiURL}/${type}`, obj)
  }

  Update<T>(type : string, obj : T, numOs : number) {
    return this.http.put<T>(`${this.apiURL}/${type}/${numOs}`, obj)
  }

  Delete<T>(type : string, numOs : number) : Observable<T> {
    return this.http.delete<T>(`${this.apiURL}/${type}/${numOs}`)
  }
}
