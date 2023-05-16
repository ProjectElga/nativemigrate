import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const notificationTypes = mirrorKeyValue([
  "GET_NOTIFCATION",
  "GET_NOTIFCATION_INDICATOR",
  "GET_NOTIFCATION_SUCCESS",
  "GET_NOTIFCATION_FAILED",
  "RESET_GET_NOTIFCATION",
]);

const {
  GET_NOTIFCATION,
  GET_NOTIFCATION_INDICATOR,
  GET_NOTIFCATION_SUCCESS,
  GET_NOTIFCATION_FAILED,
  RESET_GET_NOTIFCATION,
} = notificationTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  loading: false,
  error: false,
  errorMsg: "",
  isSuccessfull: false,
  notificationData: [],
  isNewNotification: false,
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_NOTIFCATION:
      return { ...state, ...data };
    case GET_NOTIFCATION_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case GET_NOTIFCATION_SUCCESS:
      const response = action.response;
      let array = [];
      array = response.data
      let isReadArray = array.map(({ isRead }) => isRead)
      var set = new Set(isReadArray);
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
        notificationData: response.data,
        isNewNotification: set.size === 2 ? true : false
      };

    case GET_NOTIFCATION_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case RESET_GET_NOTIFCATION:
      return INITIAL_STATE;
    default:
      return state;
  }
}
