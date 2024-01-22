import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../IUser.interface";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private localStorageService: LocalStorageService = inject(LocalStorageService)
  private fb: FormBuilder = inject(FormBuilder);
  public myUser: IUser[] = [];

  public getMaxIdUsers(myUser?: IUser[]): string {
    return myUser ?
      String(Math.max(...myUser.map((user: IUser) => +user.id)) + 1)
      : '0';
  }

  public addUser(newUser: IUser): void {
    this.myUser = [...this.myUser, newUser];
    this.localStorageService.saveUser(this.myUser)
    console.log(this.myUser)
  }

  public editUser(editUser: IUser): void {
    if (editUser && editUser.id) {
      const userIndex = this.myUser.findIndex((user: IUser) => user.id === editUser.id);
      if (userIndex !== -1) {
        const updatedUsers = [...this.myUser];
        updatedUsers[userIndex] = editUser;
        this.myUser = updatedUsers;
      }
      this.localStorageService.saveUser(this.myUser);
    }
  }
  public UserFormGroup(userForm?: any): FormGroup {
    return this.fb.group ({
      id: [userForm?.id ?? this.getMaxIdUsers(this.myUser)],
      name: [userForm?.name, Validators.required],
      email: [userForm?.email, Validators.required],
      phone: [userForm?.phone, Validators.required],
      website: [userForm?.website, Validators.required],
    })
  }

  onDeleteUser(users: any) {
    const index = this.myUser.indexOf(users);
    if (index !== -1) {
      this.myUser.splice(index, 1);
    }
    this.localStorageService.saveUser(this.myUser)
    console.log(this.myUser)
  }
}
