import { createSelector } from 'reselect';

export const getUsers = (state) => {
  return state.users.users;
};
