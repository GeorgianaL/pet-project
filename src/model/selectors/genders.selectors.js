
import { createSelector } from 'reselect';
import * as moment from 'moment';

import { MALE, FEMALE } from './constants';
import { months, getUsersBy } from '../../lib';

import { getUsers, getMaleUsers, getFemaleUsers } from './users.selectors';


export const getUsersByGenderAndBirth = createSelector(
  [getUsers],
  (users) => {
    const males = getUsersBy(users, 'gender', MALE);
    const females = getUsersBy(users, 'gender', FEMALE);

    return months.reduce((acc, currentMonth, monthIdx) => {
      return {
        ...acc,
        [currentMonth]: {
          MALE: males.filter(user=> moment(user.birth.date, 'MM/DD/YYYY').month() === monthIdx),
          FEMALE: females.filter(user=> moment(user.birth.date, 'MM/DD/YYYY').month() === monthIdx),
        }
      }
    }, []);
  }
);
