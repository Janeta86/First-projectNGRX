import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgFor} from "@angular/common";
import { UserCardComponent } from "../user-card/user-card.component";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { AddUserComponent } from "../add-user/add-user.component";
import { Store} from "@ngrx/store";
import { addUserAction, loadingUserAction} from "../../store/users.actions";
import { IUser} from "../../user.interface";
import { selectUsers} from "../../store/users.selectors";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, UserCardComponent, MatDialogModule, MatButtonModule, AsyncPipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  private store: Store = inject(Store)
  private dialog = inject(MatDialog)

  users$ = this.store.select(selectUsers);

  ngOnInit(): void {
    this.store.dispatch(loadingUserAction());
  }

  addUsers(newUser: IUser) {
    this.store.dispatch(addUserAction({newUser: newUser}));
  }

  openDialog() {
    const addDialog = this.dialog.open(AddUserComponent, {
      width: '350px'
    });
    addDialog.afterClosed().pipe().subscribe((newUser) => {
      if (newUser) {
        this.addUsers(newUser);
      }
    });
  }
}
