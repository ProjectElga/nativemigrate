import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const youtubeTypes = mirrorKeyValue([
  "FETCH_YOUTUBE_MEDIA",
  "FETCH_YOUTUBE_MEDIA_INDICATOR",
  "FETCH_YOUTUBE_MEDIA_SUCCESS",
  "FETCH_YOUTUBE_MEDIA_FAILED",
  "RESET_FETCH_YOUTUBE_MEDIA",
]);

const {
  FETCH_YOUTUBE_MEDIA,
  FETCH_YOUTUBE_MEDIA_INDICATOR,
  FETCH_YOUTUBE_MEDIA_SUCCESS,
  FETCH_YOUTUBE_MEDIA_FAILED,
  RESET_FETCH_YOUTUBE_MEDIA,
} = youtubeTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  youtubeloading: true,
  error: false,
  errorMsg: "",
  isSuccessfull: false,
  youtubeData: {}
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case FETCH_YOUTUBE_MEDIA:
      return { ...state, ...data };
    case FETCH_YOUTUBE_MEDIA_INDICATOR:
      return {
        ...state,
        youtubeloading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case FETCH_YOUTUBE_MEDIA_SUCCESS:
      const response = action.response;

      return {
        ...state,
        youtubeloading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
        youtubeData: response?.data
      };

    case FETCH_YOUTUBE_MEDIA_FAILED:
      return {
        ...state,
        youtubeloading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case RESET_FETCH_YOUTUBE_MEDIA:
      return INITIAL_STATE;
    default:
      return state;
  }
}
