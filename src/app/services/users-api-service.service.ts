import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { IUser } from "../IUser.interface";
@Injectable({
  providedIn: 'root'
})
export class UsersApiServiceService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http:HttpClient) { }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  addUser(newUser: IUser): Observable<IUser[]> {
    return this.http.post<IUser[]>(this.apiUrl, newUser);
  }

  editUser(editUser: IUser): Observable<IUser[]>{
    return this.http.put<IUser[]>(`${this.apiUrl}/1`, editUser);
  }

  deleteUser(id: number): Observable<IUser[]>{
    return this.http.delete<IUser[]>(`${this.apiUrl}/${id}`);
  }
}
