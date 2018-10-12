
import { createSelector } from 'reselect';
import * as moment from 'moment';

import { getUsersBy } from '../../lib';

import { MALE, FEMALE } from './constants';

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
      const cardTypes = types.map(type => type.credit_card_type);
      if (!cardTypes.includes(user.credit_card_type)) {
        types = [... types, {
          'credit_card_type': user.credit_card_type,
          'male': user.gender === MALE ? 1 : 0,
          'female': user.gender === FEMALE ? 1 : 0,
        }];
      } else {
        let userCreditType = types.find(type => type.credit_card_type === user.credit_card_type);
        types.splice(types.indexOf(userCreditType), 1);
        if (user.gender === MALE) {
          userCreditType = {
            ...userCreditType,
            'male': userCreditType.male + 1,
          };
        } else {
          userCreditType = {
            ...userCreditType,
            'female': userCreditType.female + 1,
          };
        }
        types = [
          ...types,
          userCreditType,
        ];
      }
    });

    return types;
  }
);
