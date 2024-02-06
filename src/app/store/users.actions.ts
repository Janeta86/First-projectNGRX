import { createAction, props } from "@ngrx/store"
import {IUser} from "../user.interface";

export const loadingUserAction = createAction('[USER] loadingUserAction');

export const loadingSuccessUserAction = createAction('[USER] loadingSuccessUserAction', props<{myUsers: IUser[]}>());

export const loadFailedUserAction = createAction('[USER] loadFailedUserAction', props<{ error: any }>());

export const addUserAction = createAction('[USER] addUserAction', props<{newUser: IUser}>());

export const successAddUserAction = createAction('[USER] successAddUserAction', props<{newUser: IUser}>());

export const editUserAction = createAction('[USER] editUserAction', props<{editUser: IUser}>());

export const successEditUserAction = createAction('[USER] successEditUserAction', props<{editUser: IUser}>());

export const deleteUserAction = createAction('[USER] deleteUserAction', props<{ id: number }>());

export const successDeleteUserAction = createAction('[USER] successDeleteUserAction', props<{id: number}>());




