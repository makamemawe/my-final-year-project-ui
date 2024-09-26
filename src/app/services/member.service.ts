import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Member } from '../models/member.model';

const BASIC_URL = environment["BASIC_URL"]

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  requestHeader: HttpHeaders | { [header: string]: string | string[]; } | undefined;

  constructor(
    private http: HttpClient
  ) { }

  getProductionMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(BASIC_URL + "getAllMembers");
  }

  getProductionMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(`${BASIC_URL}getMemberById/${id}`);
  }

  createProductionMember(member: FormData): Observable<Member> {
    return this.http.post<Member>(BASIC_URL + "addNewMember", member);
  }

  updateProductionMember(id: number, member: FormData): Observable<Member> {
    return this.http.put<Member>(`${BASIC_URL}api/production-members/${id}`, member);
  }

  deleteProductionMember(id: number): Observable<void> {
    return this.http.delete<void>(`${BASIC_URL}api/production-members/${id}`);
  }
}
