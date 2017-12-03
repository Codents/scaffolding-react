import { get } from 'lodash/object';
import * as actions from './actions';

export default (
  state = {
    user: '',
    isAuthenticated: false,
    city: '',
  },
  action
) => {
  switch (action.type) {
    case actions.REVEIVE_WEATHER:
      return {
        ...state,
        city: get(action.weather, 'city.name'),
      };
    default:
      return state;
  }
};
