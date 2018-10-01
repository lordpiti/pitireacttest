import * as actionTypes from './actionTypes';

export const updateLoadingSpinner = (isLoading) => {
  return {
      type: actionTypes.UPDATE_LOADING_SPINNER,
      payload: isLoading
  };
};

export const acToastDashMessage = (message) => {
  return {
    type: actionTypes.TOAST_DASH_MESSAGE,
    payload:message
  };

}
export const acToastDashClear = () => {
  
  return {
    type: actionTypes.TOAST_DASH_CLEAR
  };

}