import {Component, inject, Input, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {IUser} from "../../user.interface";
import {editUserAction} from "../../store/users.actions";
import {Store} from "@ngrx/store";
import {UsersApiService} from "../../services/users-api.service";
import {UsersFormService} from "../../services/users-form.service";

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
  @Input() userForm?: IUser;

  private store: Store = inject(Store)
  protected userFormService = inject(UsersFormService);
  private dialogRef: MatDialogRef<EditUserComponent> = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA)

  userEditForm!: FormGroup;

  ngOnInit() {
    if(this.data) {
      this.userEditForm = this.userFormService.userFormGroup(this.data)
    } else {
      this.userEditForm = this.userFormService.userFormGroup()
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onEditClick(): void {
    console.log(this.userEditForm.value)
    this.store.dispatch(editUserAction({editUser: this.userEditForm.value}));
    this.dialogRef.close()
  }
}

