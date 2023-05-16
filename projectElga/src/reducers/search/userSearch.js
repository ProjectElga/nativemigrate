import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const userSearchTypes = mirrorKeyValue([
  "SEARCH_USER_PROFILE",
  "SEARCH_USER_PROFILE_INDICATOR",
  "SEARCH_USER_PROFILE_SUCCESS",
  "SEARCH_USER_PROFILE_FAILED",
  "RESET_SEARCH_USER_PROFILE",
]);

const {
  SEARCH_USER_PROFILE,
  SEARCH_USER_PROFILE_INDICATOR,
  SEARCH_USER_PROFILE_SUCCESS,
  SEARCH_USER_PROFILE_FAILED,
  RESET_SEARCH_USER_PROFILE,
} = userSearchTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  loading: false,
  error: false,
  errorMsg: "",
  isSuccessfull: false,
  userSearchData: []
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case SEARCH_USER_PROFILE:
      return { ...state, ...data };
    case SEARCH_USER_PROFILE_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case SEARCH_USER_PROFILE_SUCCESS:
      const response = action.response;
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
        userSearchData: response.data
      };

    case SEARCH_USER_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case RESET_SEARCH_USER_PROFILE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
