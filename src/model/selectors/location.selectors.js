
import { createSelector } from 'reselect';
import { getUsers } from './users.selectors';
import { getUsersBy } from '../../lib';

/*
  Return data like:
  {
    {
      country:"China",
      city:"Huancapallac",
      latitude:-9.916667,
      longitude:-75.783333,
      gender: Female,
    },
  }
*/
export const getUsersLocation = createSelector(
  [getUsers],
  (users) => {
    const sources = users.reduce((acc, user) => [
      ...acc,
      {
        country: user.adress.country,
        city: user.adress.city,
        latitude: user.adress.latitude,
        longitude: user.adress.longitude,
        gender: user.gender,
      }
    ], []);

    // const connections = users.reduce((acc, user) => {
    //   const jobHolders = getUsersBy(users, 'job_title', user.job_title);
    //   const connection = jobHolders.map((jobHolder) => ({
    //       source: [user.adress.latitude, user.adress.longitude],
    //       target: [jobHolder.adress.latitude, jobHolder.adress.longitude],
    //     }));
    //   return [ ...acc, ...connection ];
    // }, []);

    return {
      'sources': sources,
      'connections': [],
    }
  }
);
