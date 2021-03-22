import { USER_NAME,USER_GENDER,USER_YEAR,USER_MONTH,USER_BMI,USER_BMI_RANGE,USER_HEIGHT,USER_WEIGHT,USER_HONOR_TODAY,USER_HONORS } from '../../constants/action-types';

export const userName = (user) => (
  {
    type: USER_NAME,
    payload: user,
  }
);

export const userGender = (user) => (
  {
    type: USER_GENDER,
    payload: user,
  }
);

export const userYear = (user) => (
  {
    type: USER_YEAR,
    payload: user,
  }
);

export const userMonth = (user) => (
  {
    type: USER_MONTH,
    payload: user,
  }
);

export const userBMI = (user) => (
  {
    type: USER_BMI,
    payload: user,
  }
);

export const userBMIRange = (user) => (
  {
    type: USER_BMI_RANGE,
    payload: user,
  }
);

export const userHeight = (user) => (
  {
    type: USER_HEIGHT,
    payload: user,
  }
);

export const userWeight = (user) => (
  {
    type: USER_WEIGHT,
    payload: user,
  }
);

export const userHonorToday = (user) => (
  {
    type: USER_HONOR_TODAY,
    payload: user,
  }
);

export const userHonors = (user) => (
  {
    type: USER_HONORS,
    payload: user,
  }
);
