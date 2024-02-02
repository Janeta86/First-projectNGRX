import { Injectable } from '@angular/core';
import {IUser} from "../../IUser.interface";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public saveUser(localStorageKey: string, data: any): void {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }

  public loadUser(localStorageKey: string): any {
    const save = localStorage.getItem(localStorageKey);
    if (save) {
      return JSON.parse(save);
    } else {
      return null;
    }
  }
}
