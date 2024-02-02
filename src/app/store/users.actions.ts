import { createAction, props } from "@ngrx/store"
import {IUser} from "../IUser.interface";

export const loadingAction = createAction('[USER] loadingAction');

export const loadingSuccessAction = createAction('[USER] loadingSuccessAction', props<{myUsers: IUser[]}>());

export const loadFailedAction = createAction('[USER] loadFailedAction', props<{ error: any }>());

export const addAction = createAction('[USER] addAction', props<{newUser: IUser}>());

export const successAddAction = createAction('[USER] successAddAction', props<{newUser: IUser}>());

export const editAction = createAction('[USER] editAction', props<{editUser: IUser}>());

export const successEditAction = createAction('[USER] successEditAction', props<{editUser: IUser}>());

export const deleteAction = createAction('[USER] deleteAction', props<{ id: number }>());

export const successDeleteAction = createAction('[USER] successDeleteAction', props<{id: number}>());




