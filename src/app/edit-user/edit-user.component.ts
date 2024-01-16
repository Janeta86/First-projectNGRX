import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "../services/users.service";

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
  userEditForm!: FormGroup;
  ngOnInit() {
    this.userEditForm = this.userService.UserFormGroup();
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
  onEditClick(): void {
    console.log(this.userEditForm.value)
    this.dialogRef.close(this.userEditForm.value)
  }


}
