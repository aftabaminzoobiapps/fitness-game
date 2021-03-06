/* eslint-disable */
const loggingMiddleware = (store : Object) => (next : Function) => (action : Object) => {
  console.info('INFO:', `Dispatching a ${action.type} action with payload:`, action.payload);
  const result = next(action);
  console.info('Next State:', store.getState());
  return result;
};

export default loggingMiddleware;
