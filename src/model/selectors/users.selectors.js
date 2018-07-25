import { createSelector } from 'reselect';

import { MALE, FEMALE } from './constants';

export const getUsers = (state) => {
  return state.users.users;
};
