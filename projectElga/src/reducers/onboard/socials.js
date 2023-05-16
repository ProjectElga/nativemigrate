import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const saveInstagramInfo = mirrorKeyValue([
  "SAVE_INSTAGRAM_INFO",
  "SAVE_INSTAGRAM_INFO_INDICATOR",
  "SAVE_INSTAGRAM_INFO_SUCCESS",
  "SAVE_INSTAGRAM_INFO_FAILED",
  "RESET_SAVE_INSTAGRAM_INFO",
]);

const {
  SAVE_INSTAGRAM_INFO,
  SAVE_INSTAGRAM_INFO_INDICATOR,
  SAVE_INSTAGRAM_INFO_SUCCESS,
  SAVE_INSTAGRAM_INFO_FAILED,
  RESET_SAVE_INSTAGRAM_INFO,
} = saveInstagramInfo;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  loading: false,
  error: false,
  errorMsg: "",
  isSuccessfull: false,
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case SAVE_INSTAGRAM_INFO:
      return { ...state, ...data };
    case SAVE_INSTAGRAM_INFO_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case SAVE_INSTAGRAM_INFO_SUCCESS:
      const response = action.response.data;
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
      };

    case SAVE_INSTAGRAM_INFO_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case RESET_SAVE_INSTAGRAM_INFO:
      return INITIAL_STATE;
    default:
      return state;
  }
}
