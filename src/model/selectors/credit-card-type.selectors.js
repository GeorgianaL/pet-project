
import { createSelector } from 'reselect';
import * as moment from 'moment';

import { getUsersBy } from '../../lib';

import { getUsers } from './users.selectors';

/*
  Return data like:
  {

  }
*/
export const getUsersByCreditCardType = createSelector(
  [getUsers],
  (users) => {
    let types = [];

    users.map(user => {
      if (!types.includes(user.credit_card_type)) {
        types = [... types, user.credit_card_type];
      }
    });

    console.log(types);
  }
);
