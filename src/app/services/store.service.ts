import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  static getRoles: any;

  constructor() {

  }
private role$ = new BehaviorSubject<string>('')
//private roleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('guest');
//public role$: Observable<string> = this.roleSubject.asObservable();

getRoles(){
  return this.role$.asObservable();
}

setRoles(role: string){
  this.role$.next(role);
}

  // public setRoles(roles: []) {
  //   localStorage.setItem('roles', JSON.stringify(roles));
  // }

  // public getRoles(): [] {
  //   return JSON.parse(localStorage.getItem('roles'));
  // }

  // public setToken(jwtToken: string) {
  //   localStorage.setItem('jwtToken', jwtToken);
  // }

  // public getToken(): string {
  //   return localStorage.getItem('jwtToken');
  // }

  // public clear() {
  //   localStorage.clear();
  // }

  // public isLoggedIn() {
  //   return this.getRoles() && this.getToken();
  // }

  // public isAdmin() {
  //   const roles: any[] = this.getRoles();
  //   return roles[0].roleName === 'Admin';
  // }

  // public isUser() {
  //   const roles: any[] = this.getRoles();
  //   return roles[0].roleName === 'User';
  // }
}


