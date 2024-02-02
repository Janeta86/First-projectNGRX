import {createReducer, on} from "@ngrx/store";
import {IUser} from "../IUser.interface";
import {
  addAction,
  deleteAction, deleteSuccessAction,
  editAction, editSuccessAction,
  loadingAction,
  loadingSuccessAction,
  successAddAction
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
  // on(loadingFailureAction, (state, { error }) => ({
  //   ...state,
  //   loading: false,
  //   error
  // })),
  on(addAction, (state, { newUser }) => ({
    ...state,
    users: [...state.users, newUser],
  })),
  on(editAction, (state, { editUser }) => {
    const updatedUsers = state.users.map(user =>
      user.id === editUser.id ? { ...user, ...editUser } : user
    );
    return {
      ...state,
      users: updatedUsers };
  }),
  on(deleteAction, (state, { id }) => {
    const users = state.users.filter(user => user.id !== id);
    return {
      ...state,
      users: users };
  })
)



