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
  @Input() users!: any;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  onDelete() {
    this.delete.emit(this.users);
  }
  public openEditDialog(){
    const editDialog = this.dialog.open(EditUserComponent, {
      width: '350px'
    });
    editDialog.afterClosed().subscribe( (value) => this.userService.editUser(value));
  }

}
