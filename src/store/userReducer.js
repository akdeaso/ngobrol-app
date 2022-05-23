import {SET_SELECTED_USER} from '../screens/Home/redux/action';
import {LOG_OUT, USER_DATA} from '../screens/Login/redux/action';

const initialState = {};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        _user: action.payload,
      };
    case SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case LOG_OUT: {
      return {};
    }
    default:
      return state;
  }
};
export default UserReducer;
