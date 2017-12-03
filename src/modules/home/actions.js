import { services } from '../../common';

export const REVEIVE_WEATHER = 'REVEIVE_WEATHER';

export function receiveWeather(weather) {
  return {
    type: REVEIVE_WEATHER,
    weather,
  };
}

export function getWeather() {
  return async dispatch => {
    const weather = await services.getWeather();
    dispatch(receiveWeather(weather));
  };
}
