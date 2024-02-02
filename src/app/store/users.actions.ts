import { createAction, props } from "@ngrx/store"
import {IUser} from "../IUser.interface";

export const loadingAction = createAction('[USER] loading');

export const loadingSuccessAction = createAction('[USER] success download', props<{myUsers: IUser[]}>());

export const loadFailedAction = createAction('[USER] failed download');

export const addAction = createAction('[USER] add', props<{newUser: IUser}>());

export const successAddAction = createAction('[USER] add success', props<{newUser: IUser}>());

export const editAction = createAction('[USER] edit', props<{editUser: IUser}>());

export const editSuccessAction = createAction('[USER] edit success', props<{editUser: IUser}>());

export const deleteAction = createAction('[USER] delete', props<{ id: number }>());

export const deleteSuccessAction = createAction('[USER] delete success ', props<{id: number}>());


