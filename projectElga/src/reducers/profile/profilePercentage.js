import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const profilePercentageTypes = mirrorKeyValue([
  "FETCH_PROFILE_PERCENTAGE",
  "FETCH_PROFILE_PERCENTAGE_INDICATOR",
  "FETCH_PROFILE_PERCENTAGE_SUCCESS",
  "FETCH_PROFILE_PERCENTAGE_FAILED",
  "RESET_FETCH_PROFILE_PERCENTAGE",
]);

const {
  FETCH_PROFILE_PERCENTAGE,
  FETCH_PROFILE_PERCENTAGE_INDICATOR,
  FETCH_PROFILE_PERCENTAGE_SUCCESS,
  FETCH_PROFILE_PERCENTAGE_FAILED,
  RESET_FETCH_PROFILE_PERCENTAGE,
} = profilePercentageTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  ppLoading: true,
  error: false,
  errorMsg: "",
  isSuccessfull: false,
  profilePercentageData: {}
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case FETCH_PROFILE_PERCENTAGE:
      return { ...state, ...data };
    case FETCH_PROFILE_PERCENTAGE_INDICATOR:
      return {
        ...state,
        ppLoading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case FETCH_PROFILE_PERCENTAGE_SUCCESS:
      const response = action.response;

      return {
        ...state,
        ppLoading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
        profilePercentageData: response?.data
      };

    case FETCH_PROFILE_PERCENTAGE_FAILED:
      return {
        ...state,
        ppLoading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case RESET_FETCH_PROFILE_PERCENTAGE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
