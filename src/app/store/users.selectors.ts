import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userState } from './users.reducer';

export const selectUsersState = createFeatureSelector<userState>('users');

export const selectUsers = createSelector(
  selectUsersState,
  state => state.users
);
