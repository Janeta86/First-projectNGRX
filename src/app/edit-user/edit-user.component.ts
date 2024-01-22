import {Component, inject, Input, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {IUser} from "../IUser.interface";

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
  protected userService = inject(UsersService);
  private dialogRef: MatDialogRef<EditUserComponent> = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA)

  userEditForm!: FormGroup;
  @Input() userForm?: IUser;

  ngOnInit() {
    if(this.data) {
      this.userEditForm = this.userService.UserFormGroup(this.data)
    } else {
      this.userEditForm = this.userService.UserFormGroup()
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onEditClick(): void {
    console.log(this.userEditForm.value)
    this.dialogRef.close(this.userEditForm.value)
  }
}
