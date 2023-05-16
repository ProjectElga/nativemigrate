import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const instagramTypes = mirrorKeyValue([
  "FETCH_INSTAGRAM_MEDIA",
  "FETCH_INSTAGRAM_MEDIA_INDICATOR",
  "FETCH_INSTAGRAM_MEDIA_SUCCESS",
  "FETCH_INSTAGRAM_MEDIA_FAILED",
  "RESET_FETCH_INSTAGRAM_MEDIA",
]);

const {
  FETCH_INSTAGRAM_MEDIA,
  FETCH_INSTAGRAM_MEDIA_INDICATOR,
  FETCH_INSTAGRAM_MEDIA_SUCCESS,
  FETCH_INSTAGRAM_MEDIA_FAILED,
  RESET_FETCH_INSTAGRAM_MEDIA,
} = instagramTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  instaloading: true,
  error: false,
  errorMsg: "",
  isSuccessfull: false,
  instagramData: {}
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case FETCH_INSTAGRAM_MEDIA:
      return { ...state, ...data };
    case FETCH_INSTAGRAM_MEDIA_INDICATOR:
      return {
        ...state,
        instaloading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case FETCH_INSTAGRAM_MEDIA_SUCCESS:
      const response = action.response;

      return {
        ...state,
        instaloading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
        instagramData: response?.data
      };

    case FETCH_INSTAGRAM_MEDIA_FAILED:
      return {
        ...state,
        instaloading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case RESET_FETCH_INSTAGRAM_MEDIA:
      return INITIAL_STATE;
    default:
      return state;
  }
}
