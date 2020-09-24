// custom fake middleware
export const logger = (store: any) => {
  return (next: any) => {
    return (action: any) => {
      //Uncomment the console.logs to see the middleware working
      //console.log('[Middleware] Dispatching', action);
      const result = next(action);
      //console.log('[Middleware] next state', store.getState());
      return result;
    };
  };
};
