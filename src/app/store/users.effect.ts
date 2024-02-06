import {Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {map, switchMap} from "rxjs/operators";
import {
  addUserAction,
  deleteUserAction,
  editUserAction,
  loadingSuccessUserAction,
  loadingUserAction,
  successAddUserAction,
  successDeleteUserAction,
  successEditUserAction
} from "./users.actions";
import {UsersApiService} from "../services/users-api.service";

@Injectable()
export class UsersEffect {
  constructor(
    private actions$: Actions,
    private usersApiService: UsersApiService,
  ) {}

  loadUsers$ = createEffect(()=>
    this.actions$.pipe(
      ofType(loadingUserAction),
      switchMap(()=>
        this.usersApiService.getUsers().pipe(
          map((val)=>loadingSuccessUserAction({myUsers: val})),
        )
      )
    )
  )

  addUsers$ = createEffect(()=>
    this.actions$.pipe(
      ofType(addUserAction),
      switchMap(({newUser})=>
        this.usersApiService.addUser(newUser).pipe(
          map((user)=>successAddUserAction({newUser: user}))
        )
      )
    )
  )

  editUsers$ = createEffect(()=>
    this.actions$.pipe(
      ofType(editUserAction),
      switchMap(({editUser})=>
        this.usersApiService.editUser(editUser).pipe(
          map(()=>successEditUserAction({editUser}))
        )
      )
    )
  )

  deleteUsers$ = createEffect(()=>
    this.actions$.pipe(
      ofType(deleteUserAction),
      switchMap(({id})=>
        this.usersApiService.deleteUser(id).pipe(
          map(()=>successDeleteUserAction({id}))
        )
      )
    )
  )
}
