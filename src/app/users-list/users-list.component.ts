import { Component, OnInit, inject } from '@angular/core';
import { UsersApiServiceService }  from "../services/users-api-service.service";
import { NgFor } from "@angular/common";
import { UserCardComponent } from "../user-card/user-card.component";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { AddUserComponent } from "../add-user/add-user.component";
import {UsersService} from "../services/users.service";
import {LocalStorageService} from "../services/local-storage.service";
import {IUser} from "../IUser.interface";


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, UserCardComponent, MatDialogModule, MatButtonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  protected userApiService = inject(UsersApiServiceService);
  private dialog = inject(MatDialog)
  protected userService = inject(UsersService);
  private localStorageService: LocalStorageService = inject(LocalStorageService)

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const load: IUser[] = this.localStorageService.loadUser()
    if (load) {
      this.userService.myUser = load;
    }
    if (this.userService.myUser.length === 0) {
      this.userApiService.getUsers().subscribe({
        next: (value) => {
          this.userService.myUser = value;
        },
        error: (error) => {
          console.error('Ошибка при загрузке пользователей:', error);
        }
      })
    }
    this.localStorageService.saveUser(this.userService.myUser);
  }

  openDialog(){
      const addDialog = this.dialog.open(AddUserComponent, {
        width: '350px'
      });
    addDialog.afterClosed().subscribe((value) => {
      if (value) {
        this.userService.addUser(value);
      }
    });
    }

}
