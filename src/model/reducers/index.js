import { combineReducers } from 'redux'

import data from '../MOCK_DATA.json';

const initialState = {
  users: data,
  filters: [],
};

/**
  here the app state can be updated according
  to function called (ex: ADD, DELETE, EDIT)
*/
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_FILTER_GENDER:
    //   if (action.payload) {
    //     return {
    //       ...state,
    //       filters: [...state.filters, action.payload.value],
    //     }
    //   }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  users: userReducer
});

export default rootReducer;
