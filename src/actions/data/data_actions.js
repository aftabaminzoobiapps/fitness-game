import {
  DATA_FOOD1,DATA_FOOD2,DATA_ACTIVITY1,DATA_ACTIVITY2,DATA_ACTIVITY3,DATA_DATE,DATA_RESET
} from '../../constants/action-types';

export const dataFood1 = (data,id) => (
  {
    type: DATA_FOOD1,
    payload: data,
    id: id,
  }
);

export const dataFood2 = (data,id) => (
  {
    type: DATA_FOOD2,
    payload: data,
    id: id,
  }
);

export const dataActivity1 = (data,id) => (
  {
    type: DATA_ACTIVITY1,
    payload: data,
    id: id,
  }
);

export const dataActivity2 = (data,id) => (
  {
    type: DATA_ACTIVITY2,
    payload: data,
    id: id,
  }
);

export const dataActivity3 = (data,id) => (
  {
    type: DATA_ACTIVITY3,
    payload: data,
    id: id,
  }
);

export const dataDate = (date) => (
  {
    type: DATA_DATE,
    payload: date,
  }
);
export const dataReset = () => (
  {
    type: DATA_RESET,
    payload: '',
  }
);
