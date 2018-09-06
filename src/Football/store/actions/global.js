import * as actionTypes from './actionTypes';

export const updateLoadingSpinner = (isLoading) => {
  return {
      type: actionTypes.UPDATE_LOADING_SPINNER,
      payload: isLoading
  };
};