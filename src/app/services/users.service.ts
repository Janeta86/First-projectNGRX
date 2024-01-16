import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersApiServiceService} from "./users-api-service.service";
import {IUser} from "../IUser.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userApiService = inject(UsersApiServiceService);
  private fb: FormBuilder = inject(FormBuilder);

  public getMaxIdUsers(users?: IUser[]): string {
    return users ?
      String(Math.max(...users.map((user: IUser) => +user.id)) + 1)
      : '0';
  }

  public addUser(newUser: IUser): void {
    console.log(newUser);
    this.userApiService.users = [...this.userApiService.users, newUser];
  }

  public editUser(editUser: IUser): void {
    const userIndex = this.userApiService.users.findIndex((user: IUser) => user.id === editUser.id);
    if (userIndex !== -1) {
      this.userApiService.users[userIndex] = editUser;
    }
  }
  public UserFormGroup(user?: any): FormGroup {
    return this.fb.group ({
      id: [user?.id ?? this.getMaxIdUsers(this.userApiService.users)],
      name: [user?.name, Validators.required],
      email: [user?.email, [Validators.email, Validators.required]],
      phone: [user?.phone, Validators.required],
      website: [user?.website, Validators.required],
    })
  }
}
