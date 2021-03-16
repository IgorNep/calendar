import TransformData from 'utils/helpers/transformData';
import { apiService } from 'utils/services/api';
import { USERS } from 'utils/services/endpoints';
import {
  GET_USERS_REQUEST,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
} from './usersTypes';

export const getUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });
  try {
    const res = TransformData.transformDataToMeeting(
      await apiService.getData(USERS),
    );
    dispatch({ type: GET_USERS_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: GET_USERS_FAIL, payload: error });
  }
};
