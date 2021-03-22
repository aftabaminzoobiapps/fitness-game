import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loggingMiddleware from './middleware/logging';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from '../reducers';

const migrations = {
    0: (state) => {
        return {...
          			state,
          			user: {...
                				state.user,
                				honors: 0,
                        todayHonor: false,
          				}
          			}
    }
}

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  version: 0,
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'user','data','sound',
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
    'Network',
  ],
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug: false })
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (initialState: Object) => {
  // const middleware = applyMiddleware(thunk, loggingMiddleware);
  const middleware = applyMiddleware(thunk);
  return createStore(persistedReducer, initialState, middleware);
};

export const store = configureStore({});

export default configureStore;
