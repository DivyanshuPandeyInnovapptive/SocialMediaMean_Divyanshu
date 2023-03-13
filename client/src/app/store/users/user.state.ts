import { User } from './user.model';

export interface UserState {
  users: User[];
}

export const initialState: UserState = {
  users: [],
};
