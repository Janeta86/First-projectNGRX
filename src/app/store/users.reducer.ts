import {createReducer, on} from "@ngrx/store";
import {IUser} from "../IUser.interface";
import {
  addAction,
  deleteAction,
  editAction, loadFailedAction,
  loadingAction,
  loadingSuccessAction,
} from "./users.actions";

export const USERS_FEATURE_KEY = 'users';

export interface userState {
  users: IUser[];
  loading: boolean;
  error: any;
}

export const initialState: userState = {
  users: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(loadingAction, (state) => ({
    ...state,
    loading: true,
  })),

  on(loadingSuccessAction, (state, { myUsers }) => ({
    ...state,
    users: myUsers,
    loading: false,
  })),

  on(loadFailedAction, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(addAction, (state, { newUser }) => ({
    ...state,
    users: [...state.users, newUser],
  })),

  on(editAction, (state, { editUser }) => {
    const editedUsers = state.users.map(user =>
      user.id === editUser.id ? { ...user, ...editUser } : user
    );
    return {
      ...state,
      users: editedUsers};
  }),

  on(deleteAction, (state, { id }) => {
    const users = state.users.filter(user => user.id !== id);
    return {
      ...state,
      users: users };
  })
)



