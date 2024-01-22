import {Component, inject, OnInit} from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {UsersService} from "../services/users.service";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatFormFieldModule,
    MatDialogActions,
    MatButtonModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{
  private dialogRef: MatDialogRef<AddUserComponent> = inject(MatDialogRef)
  protected userService = inject(UsersService);

  userForm!: FormGroup;

  ngOnInit() {
    this.userForm = this.userService.UserFormGroup();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    this.dialogRef.close(this.userForm.value)
  }
}
