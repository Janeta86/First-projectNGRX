import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private Key: string = 'myUser'

  public saveUser(user: Object): void {
    localStorage.setItem(this.Key, JSON.stringify(user));
  }

  public loadUser(): any {
    const save = localStorage.getItem(this.Key);
    if (save) {
      return JSON.parse(save);
    } else {
      return null;
    }
  }
}
