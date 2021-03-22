// @flow
import { combineReducers } from 'redux';
import userReducer from './user-reducer';
import dataReducer from './data-reducer';
import soundReducer from './sound-reducer';

// Root Reducer
const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
  sound: soundReducer,
});

export default rootReducer;
