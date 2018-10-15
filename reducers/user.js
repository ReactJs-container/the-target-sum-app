import {
  AsyncStorage
} from 'react-native';
const initialState = {
  id: null,
  sessionId: null,
  username: null,
  password: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      // save sessionId & userId in AsyncStorage
      if (action.user.sessionId) {
        AsyncStorage.setItem('sessionId', action.user.sessionId);
      }
      if (action.user.id) {
        AsyncStorage.setItem('userId', action.user.id);
      }
      return {
        ...state,
        id: action.user.id || state.id,
        sessionId: action.user.sessionId || state.sessionId,
        username: action.user.username || state.username,
        password: action.user.password || state.password
      };
    default:
      return state;
  }
};