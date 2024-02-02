import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from "@angular/common";
import { UserCardComponent } from "../user-card/user-card.component";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { AddUserComponent } from "../add-user/add-user.component";
import {UsersService} from "../services/users.service";
import {Store} from "@ngrx/store";
import {addAction, loadingAction} from "../../store/users.actions";
import {UsersApiServiceService} from "../services/users-api-service.service";
import {FormGroup} from "@angular/forms";


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, UserCardComponent, MatDialogModule, MatButtonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  private store: Store = inject(Store)
  private dialog = inject(MatDialog)
  protected userService = inject(UsersService);
  private usersApiService = inject(UsersApiServiceService)

  userForm!: FormGroup;
  ngOnInit(): void {
    this.store.dispatch(loadingAction());
  }

  openDialog(){
      const addDialog = this.dialog.open(AddUserComponent, {
        width: '350px'
      });
    addDialog.afterClosed().subscribe((value) => {
      if (value) {
        this.store.dispatch(addAction({newUser: this.userForm.value}));
        console.log(value)
      }
    });
  }
}
