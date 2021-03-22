// @flow

import {
  DATA_FOOD1,DATA_FOOD2,DATA_ACTIVITY1,DATA_ACTIVITY2,DATA_ACTIVITY3,DATA_DATE,DATA_RESET
} from '../constants/action-types';
import moment from "moment-jalaali";

const MAX_DATA=15;

const initialState = {
  food1: new Array(MAX_DATA).fill(0),
  food2: new Array(MAX_DATA).fill(0),
  active1: new Array(MAX_DATA).fill(0),
  active2:  new Array(MAX_DATA).fill(0),
  active3:  new Array(MAX_DATA).fill(0),
  lastDay: Math.floor(moment().valueOf()/8.64e7)
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_FOOD1: {
      let food1 = [...state.food1];
      food1[action.id] = action.payload;
      return {
        ...state,
        food1: food1,
        // food1:  state.food1[action.id] = action.payload,
      };
    }
    case DATA_FOOD2: {
      let food2 = [...state.food2];
      food2[action.id] = action.payload;
      // console.log({
      //   ...state,
      // food1:  state.food1[action.id] = action.payload,
      // });
      return {
        ...state,
        food2: food2,
      };
    }
    case DATA_ACTIVITY1: {
      let active1 = [...state.active1];
      active1[action.id] = action.payload;
      return {
        ...state,
        active1: active1,
      };
    }
    case DATA_ACTIVITY2: {
      let active2 = [...state.active2];
      active2[action.id] = action.payload;
      return {
        ...state,
        active2: active2,
      };
    }
    case DATA_ACTIVITY3: {
      let active3 = [...state.active3];
      active3[action.id] = action.payload;
      return {
        ...state,
        active3: active3,
      };
    }
    case DATA_DATE: {
      return {
        ...state,
        lastDay:  action.payload,
      };
    }
    case DATA_RESET: {
      return {
        ...state,
        food1: new Array(MAX_DATA).fill(0),
        food2: new Array(MAX_DATA).fill(0),
        active1: new Array(MAX_DATA).fill(0),
        active2:  new Array(MAX_DATA).fill(0),
        active3:  new Array(MAX_DATA).fill(0),
      };
    }
    default: {
      return state;
    }
  }
};

export default dataReducer;
