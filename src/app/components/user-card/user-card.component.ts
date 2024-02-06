import {Component, Input, Output, EventEmitter, inject} from '@angular/core';
import {EditUserComponent} from "../edit-user/edit-user.component";
import {MatDialog} from "@angular/material/dialog";
import {deleteUserAction, editUserAction} from "../../store/users.actions";
import {Store} from "@ngrx/store";
import {IUser} from "../../user.interface";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() myUser!: IUser;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  private dialog = inject(MatDialog)
  private store: Store = inject(Store)

  public deleteUser() {
    this.store.dispatch(deleteUserAction({id: this.myUser.id}))
  }

  public openEditDialog() {
    const editDialog = this.dialog.open(EditUserComponent, {
      width: '350px',
      data: {
        id: this.myUser.id,
        name: this.myUser.name,
        email: this.myUser.email,
        phone: this.myUser.phone,
        website: this.myUser.website
      },
    });
    editDialog.afterClosed().pipe().subscribe((value: any) => {
      if (value) {
        this.store.dispatch(editUserAction({editUser: this.myUser}))
      }
    });
  }
}
