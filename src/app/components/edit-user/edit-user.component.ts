import {Component, inject, Input, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {IUser} from "../../IUser.interface";
import {editAction} from "../../store/users.actions";
import {Store} from "@ngrx/store";
import {UsersApiServiceService} from "../../services/users-api-service.service";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{
  private store: Store = inject(Store)
  protected userApiService = inject(UsersApiServiceService);
  private dialogRef: MatDialogRef<EditUserComponent> = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA)

  userEditForm!: FormGroup;
  @Input() userForm?: IUser;

  ngOnInit() {
    if(this.data) {
      this.userEditForm = this.userApiService.UserFormGroup(this.data)
    } else {
      this.userEditForm = this.userApiService.UserFormGroup()
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onEditClick(): void {
    console.log(this.userEditForm.value)
    this.store.dispatch(editAction({editUser: this.userEditForm.value}));
    this.dialogRef.close()
  }
}

