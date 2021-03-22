// @flow

import {
  USER_NAME,USER_GENDER,USER_YEAR,USER_MONTH,USER_BMI,USER_BMI_RANGE,USER_HEIGHT,USER_WEIGHT,
  USER_HONOR_TODAY, USER_HONORS
} from '../constants/action-types';

const initialState = {
  name: '',
  gender: 0,
  bmi: 0,
  bmiRange: 0,
  bYear: 0,
  bMonth: 0,
  weight: 0,
  height: 0,
  todayHonor: false,
  honors: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_NAME: {
      return {
        ...state,
        name:  action.payload,
      };
    }
    case USER_GENDER: {
      return {
        ...state,
        gender:  action.payload,
      };
    }
    case USER_YEAR: {
      return {
        ...state,
        bYear:  action.payload,
      };
    }
    case USER_MONTH: {
      return {
        ...state,
        bMonth:  action.payload,
      };
    }
    case USER_BMI: {
      return {
        ...state,
        bmi:  action.payload,
      };
    }
    case USER_BMI_RANGE: {
      return {
        ...state,
        bmiRange:  action.payload,
      };
    }
    case USER_HEIGHT: {
      return {
        ...state,
        height:  action.payload,
      };
    }
    case USER_WEIGHT: {
      return {
        ...state,
        weight:  action.payload,
      };
    }
    case USER_HONOR_TODAY: {
      return {
        ...state,
        todayHonor:  action.payload,
      };
    }
    case USER_HONORS: {
      return {
        ...state,
        honors:  action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
