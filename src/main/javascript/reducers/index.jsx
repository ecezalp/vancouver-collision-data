import {combineReducers} from 'redux';

import home from './homeReducer';
// import keplerGlReducer from 'kepler.gl/reducers';

export default combineReducers({
  home,
  // keplerGl: keplerGlReducer,
});