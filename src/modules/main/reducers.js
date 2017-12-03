import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import homeReducer from '../home/reducers';


const reducers = combineReducers({
  home: homeReducer,
  rutes: routing,
});

export default reducers;
