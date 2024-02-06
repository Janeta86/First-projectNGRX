import {Component, inject, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {UsersFormService} from "../../services/users-form.service";

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
export class AddUserComponent implements OnInit {
  private dialogRef: MatDialogRef<AddUserComponent> = inject(MatDialogRef)
  protected userFormService = inject(UsersFormService);

  userForm!: FormGroup;

  ngOnInit() {
    this.userForm = this.userFormService.userFormGroup();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    this.dialogRef.close(this.userForm.value)
  }
}

