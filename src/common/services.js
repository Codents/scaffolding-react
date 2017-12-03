import * as paths from './paths';

export function postLogin() {
  return fetch(paths.login);
}

export function getUsers() {
  return fetch(paths.users);
}

export function getWeather() {
  return fetch(`${ process.env.API[process.env.ENV].weather }${ paths.weather }?id=524901&APPID=${
    process.env.TOKENS.weather
  }`).then(response => response.json());
}
