import {createReducer, on} from "@ngrx/store";
import {IUser} from "../user.interface";
import {
  loadFailedUserAction,
  loadingSuccessUserAction,
  loadingUserAction,
  successAddUserAction,
  successDeleteUserAction,
  successEditUserAction,
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
  on(loadingUserAction, (state) => ({
    ...state,
    loading: true,
  })),

  on(loadingSuccessUserAction, (state, { myUsers }) => ({
    ...state,
    users: myUsers,
    loading: false,
  })),

  on(loadFailedUserAction, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(successAddUserAction, (state, { newUser }) => ({
    ...state,
    users: [...state.users, newUser],
  })),

  on(successEditUserAction, (state, { editUser }) => {
    const editedUsers = state.users.map(user =>
      user.id === editUser.id ? { ...user, ...editUser } : user
    );
    return {
      ...state,
      users: editedUsers};
  }),

  on(successDeleteUserAction, (state, { id }) => {
    const users = state.users.filter(user => user.id !== id);
    return {
      ...state,
      users: users };
  })
)



