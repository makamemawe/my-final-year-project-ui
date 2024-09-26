import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

   setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  //  getRoles(): [] {
  //   return JSON.parse(localStorage.getItem('roles'));
  // }
   getRoles(): any[] {
    const roles = localStorage.getItem('roles');
    if (roles) {
      return JSON.parse(roles);
    }
    return [];
  }

  setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }
   getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  clear() {
    localStorage.clear();
  }

 isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  isAdmin() {
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'Admin';
  }

  isSubAdmin() {
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'SubAdmin';
  }

   isUser() {
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'User';
  }
}
