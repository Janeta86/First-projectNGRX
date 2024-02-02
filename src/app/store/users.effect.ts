import {Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {map, switchMap} from "rxjs/operators";
import {
  addAction,
  deleteAction,
  editAction,
  loadingAction,
  loadingSuccessAction,
  successAddAction,
  successDeleteAction,
  successEditAction,
} from "./users.actions";
import {UsersApiServiceService} from "../services/users-api-service.service";

@Injectable()
export class UsersEffect {
  constructor(
    private actions$: Actions,
    private usersApiService: UsersApiServiceService,
  ) {}

  loadUsers$ = createEffect(()=>
    this.actions$.pipe(
      ofType(loadingAction),
      switchMap(()=>
        this.usersApiService.getUsers().pipe(
          map((val)=>loadingSuccessAction({myUsers: val})),
        )
      )
    )
  )

  addUsers$ = createEffect(()=>
    this.actions$.pipe(
      ofType(addAction),
      switchMap(({newUser})=>
        this.usersApiService.addUser(newUser).pipe(
          map((user)=>successAddAction({newUser: user}))
        )
      )
    )
  )

  editUsers$ = createEffect(()=>
    this.actions$.pipe(
      ofType(editAction),
      switchMap(({editUser})=>
        this.usersApiService.editUser(editUser).pipe(
          map(()=>successEditAction({editUser}))
        )
      )
    )
  )

  deleteUsers$ = createEffect(()=>
    this.actions$.pipe(
      ofType(deleteAction),
      switchMap(({id})=>
        this.usersApiService.deleteUser(id).pipe(
          map(()=>successDeleteAction({id}))
        )
      )
    )
  )
}
