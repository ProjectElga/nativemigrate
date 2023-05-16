import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const rewardTypes = mirrorKeyValue([
  "ADD_SHARE",
  "ADD_SHARE_INDICATOR",
  "ADD_SHARE_SUCCESS",
  "ADD_SHARE_FAILED",
]);

const { ADD_SHARE, ADD_SHARE_INDICATOR, ADD_SHARE_SUCCESS, ADD_SHARE_FAILED } =
rewardTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  isSuccessful: false,
  loading: false,
  error: false,
  errorMsg: "",
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case ADD_SHARE:
      return { ...state, ...data };

    case ADD_SHARE_INDICATOR:
      return {
        ...state,
        isSuccessful: false,
        loading: true,
        errorMsg: "",
        error: false,

      };
    case ADD_SHARE_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        error: false,
        errorMsg: "",
      };

    case ADD_SHARE_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        errorMsg: action.message,
        error: true,
      };

    default:
      return state;
  }
}
