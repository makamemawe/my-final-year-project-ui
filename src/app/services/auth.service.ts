import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BASIC_URL = environment["BASIC_URL"]

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  register(request: any): Observable<any>{
    return this.http.post(BASIC_URL + "register", request);
  }

  login(request: any): Observable<any>{
    return this.http.post(BASIC_URL + "authenticate", request);
  }

storeToken(tokenValue: any){
  localStorage.setItem('token', tokenValue);

}
}
