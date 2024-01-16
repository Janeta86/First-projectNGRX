import { Component, OnInit, inject } from '@angular/core';
import { UsersApiServiceService }  from "../services/users-api-service.service";
//import { UsersService }  from "../services/users.service";
import { NgFor } from "@angular/common";
import { UserCardComponent } from "../user-card/user-card.component";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { AddUserComponent } from "../add-user/add-user.component";
import {UsersService} from "../services/users.service";

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
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.userApiService.getUsers().subscribe({
      next: (value) => {
        this.userApiService.users = value;
      },
      error: (error) => {
        console.error('Ошибка при загрузке пользователей:', error);
      }
    })
  }
  onDeleteUser(users: any) {
    const index = this.userApiService.users.indexOf(users);
    if (index !== -1) {
      this.userApiService.users.splice(index, 1);
    }
  }

  openDialog(){
      const addDialog = this.dialog.open(AddUserComponent, {
        width: '350px'
      });
      addDialog.afterClosed().subscribe( (value) => this.userService.addUser(value));
    }


}
