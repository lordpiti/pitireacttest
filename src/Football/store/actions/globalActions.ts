import * as actionTypes from './actionTypes';

export const updateLoadingSpinner = (isLoading: boolean) => {
  return {
    type: actionTypes.UPDATE_LOADING_SPINNER,
    payload: isLoading,
  };
};

export const acToastDashMessage = (message: string, toasterType: any) => {
  return {
    type: actionTypes.TOAST_DASH_MESSAGE,
    payload: message,
    toasterType: toasterType,
  };
};
export const acToastDashClear = () => {
  return {
    type: actionTypes.TOAST_DASH_CLEAR,
  };
};
