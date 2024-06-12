import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
[x: string]: any;

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
}
