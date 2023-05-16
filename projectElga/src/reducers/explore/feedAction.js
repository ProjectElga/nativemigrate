import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const feedActionTypes = mirrorKeyValue([
  "DO_FEED_LIKE",
  "DO_FEED_LIKE_INDICATOR",
  "DO_FEED_LIKE_SUCCESS",
  "DO_FEED_LIKE_FAILED",
  "RESET_REDUCER",
]);

const {
  DO_FEED_LIKE,
  DO_FEED_LIKE_INDICATOR,
  DO_FEED_LIKE_SUCCESS,
  DO_FEED_LIKE_FAILED,
  RESET_REDUCER,
} = feedActionTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  loading: false,
  error: false,
  errorMsg: "",
  feedLikeData: [],
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case DO_FEED_LIKE:
      return { ...state, ...data };

    case DO_FEED_LIKE_INDICATOR:
      return {
        ...state,
        isSuccessful: false,
        loading: true,
        errorMsg: "",
        error: false,
      };
    case DO_FEED_LIKE_SUCCESS:
      return {
        ...state,
        feedLikeData: action.response.data,
        loading: false,
        error: false,
        errorMsg: "",
      };

    case DO_FEED_LIKE_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        errorMsg: action.message,
        error: true,
      };
    case RESET_REDUCER:
      return INITIAL_STATE;
    default:
      return state;
  }
}
