import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { IUser } from "../IUser.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class UsersApiServiceService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'
  private fb: FormBuilder = inject(FormBuilder);
  public myUser: IUser[] = [];

  constructor(private http:HttpClient) { }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  addUser(newUser: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, newUser);
  }

  editUser(editUser: IUser): Observable<IUser[]>{
    return this.http.put<IUser[]>(`${this.apiUrl}/1`, editUser);
  }

  deleteUser(id: number): Observable<IUser[]>{
    return this.http.delete<IUser[]>(`${this.apiUrl}/${id}`);
  }

  public UserFormGroup(userForm?: any): FormGroup {
    return this.fb.group ({
      id: [userForm?.id ?? new Date()],
      name: [userForm?.name, Validators.required],
      email: [userForm?.email, Validators.required],
      phone: [userForm?.phone, Validators.required],
      website: [userForm?.website, Validators.required],
    })
  }
}
