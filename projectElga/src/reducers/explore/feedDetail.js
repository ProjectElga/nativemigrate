import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const getFeedDetailTypes = mirrorKeyValue([
  "GET_FEED_DETAILS_LIST",
  "GET_FEED_DETAILS_LIST_INDICATOR",
  "GET_FEED_DETAILS_LIST_SUCCESS",
  "GET_FEED_DETAILS_LIST_FAILED",
]);

const {
  GET_FEED_DETAILS_LIST,
  GET_FEED_DETAILS_LIST_INDICATOR,
  GET_FEED_DETAILS_LIST_SUCCESS,
  GET_FEED_DETAILS_LIST_FAILED,
} = getFeedDetailTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  loading: false,
  error: false,
  errorMsg: "",
  feedData: {},
  isSuccessFull: false,
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_FEED_DETAILS_LIST:
      return { ...state, ...data };
    case GET_FEED_DETAILS_LIST_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        error: false,
        isSuccessFull: false,
      };
    case GET_FEED_DETAILS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        feedData: action.response.data,
        isSuccessFull: true,
      };

    case GET_FEED_DETAILS_LIST_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessFull: false,
      };
    default:
      return state;
  }
}
