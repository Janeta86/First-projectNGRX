import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {inject, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UsersFormService {
  private fb: FormBuilder = inject(FormBuilder);

  public userFormGroup(userForm?: any): FormGroup {
    return this.fb.group({
      id: [userForm?.id ?? new Date()],
      name: [userForm?.name, Validators.required],
      email: [userForm?.email, Validators.required],
      phone: [userForm?.phone, Validators.required],
      website: [userForm?.website, Validators.required],
    })
  }
}
