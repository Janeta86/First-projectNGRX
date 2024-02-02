import { createAction, props } from "@ngrx/store"
import {IUser} from "../IUser.interface";

export const loadingAction = createAction('[USER] loading');

export const loadingSuccessAction = createAction('[USER] success download', props<{myUsers: IUser[]}>());

export const loadFailedAction = createAction('[USER] failed download', props<{ error: any }>());

export const addAction = createAction('[USER] add', props<{newUser: IUser}>());

export const successAddAction = createAction('[USER] add success', props<{newUser: IUser}>());

export const addFailedAction = createAction('[USER] failed add', props<{ error: any }>());

export const editAction = createAction('[USER] edit', props<{editUser: IUser}>());

export const editSuccessAction = createAction('[USER] edit success', props<{editUser: IUser}>());

export const editFailedAction = createAction('[USER] failed edit', props<{ error: any }>());

export const deleteAction = createAction('[USER] delete', props<{ id: number }>());

export const deleteSuccessAction = createAction('[USER] delete success ', props<{id: number}>());

export const deleteFailedAction = createAction('[USER] failed delete', props<{ error: any }>());


