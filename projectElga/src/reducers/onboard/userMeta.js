import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const UserMetaTypes = mirrorKeyValue([
  "FETCH_USER_META",
  "FETCH_USER_META_INDICATOR",
  "FETCH_USER_META_SUCCESS",
  "FETCH_USER_META_FAILED",
  "RESET_FETCH_USER_META",
]);

const {
  FETCH_USER_META,
  FETCH_USER_META_INDICATOR,
  FETCH_USER_META_SUCCESS,
  FETCH_USER_META_FAILED,
  RESET_FETCH_USER_META,
} = UserMetaTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  loading: false,
  error: false,
  errorMsg: "",
  userMeta:{},
  isSuccessfull: false,
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case FETCH_USER_META:
      return { ...state, ...data };
    case FETCH_USER_META_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case FETCH_USER_META_SUCCESS:
      const response = action.response.data;
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        userMeta: response,
        isSuccessfull: true,
      };

    case FETCH_USER_META_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case RESET_FETCH_USER_META:
      return INITIAL_STATE;
    default:
      return state;
  }
}
