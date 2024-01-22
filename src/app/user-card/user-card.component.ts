import {
  Component,
  Input,
  Output,
  EventEmitter, inject
} from '@angular/core';
import {EditUserComponent} from "../edit-user/edit-user.component";
import {MatDialog} from "@angular/material/dialog";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  private dialog = inject(MatDialog)
  protected userService = inject(UsersService);
  @Input() myUser!: any;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  onDelete() {
    this.delete.emit(this.myUser);
  }
  public openEditDialog(){
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
    editDialog.afterClosed().subscribe( (value: any) => this.userService.editUser(value));
  }
}
