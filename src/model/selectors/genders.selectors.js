
import { createSelector } from 'reselect';
import * as moment from 'moment';

import { MALE, FEMALE, DATE } from './constants';
import { months, getUsersBy } from '../../lib';

import { getUsers, getMaleUsers, getFemaleUsers } from './users.selectors';

/*
  Return data like:
  {
    {
      date: '01/15/1990',
      MALE: 29,
      FEMALES: 41,
    },
    {
      date: '02/15/1990',
      MALE: 49,
      FEMALES: 42,
    },
  }
*/
export const getUsersByGenderAndBirth = createSelector(
  [getUsers],
  (users) => {
    const males = getUsersBy(users, 'gender', MALE);
    const females = getUsersBy(users, 'gender', FEMALE);

    return months.reduce((acc, currentMonth, monthIdx) => [
      ...acc,
      {
        [DATE]: moment().date(15).month(currentMonth).year(1990),
        [MALE.toLowerCase()]: males.filter(user=> moment(user.birth.date, 'MM/DD/YYYY').month() === monthIdx + 1).length,
        [FEMALE.toLowerCase()]: females.filter(user=> moment(user.birth.date, 'MM/DD/YYYY').month() === monthIdx + 1).length,
      }
    ], []);
  }
);
