import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserAuthService } from './user-auth.service';


const BASIC_URL = environment["BASIC_URL"]

@Injectable({
  providedIn: 'root'
})
export class UserService {

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public register(user: any) {
    return this.http.post(BASIC_URL + 'registerNewUser', user);
  }

  login(jwtRequest: any) {
    return this.http.post(BASIC_URL + 'authenticate', jwtRequest, {
      headers: this.requestHeader,
    });
  }

   forUser() {
    return this.http.get(BASIC_URL + '/forUser', {
      responseType: 'text',
    });
  }

  forAdmin() {
    return this.http.get(BASIC_URL + '/forAdmin', {
      responseType: 'text',
    });
  }

  forSubAdmin() {
    return this.http.get(BASIC_URL + '/forSubAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles: string | any[]): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return false;
  }
}
