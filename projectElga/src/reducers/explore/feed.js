import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const getFeedListTypes = mirrorKeyValue([
  "GET_FEED_LIST",
  "GET_FEED_LIST_INDICATOR",
  "GET_FEED_LIST_SUCCESS",
  "GET_FEED_LIST_FAILED",
  "RESET_OFF_SET_VALUE",
  "RESER_LOADER",
]);

const {
  GET_FEED_LIST,
  GET_FEED_LIST_INDICATOR,
  GET_FEED_LIST_SUCCESS,
  GET_FEED_LIST_FAILED,
  RESET_OFF_SET_VALUE,
  RESER_LOADER,
} = getFeedListTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  isSuccessful: false,
  loading: false,
  error: false,
  errorMsg: "",
  feedData: [],
  recordOffset: 0,
  recordPerPage: 10,
  isMoreData: false,
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_FEED_LIST:
      return { ...state, ...data };
    case RESET_OFF_SET_VALUE:
      return {
        ...state,
        recordOffset: 0,
        recordPerPage: 10,
        feedData: [],
        isMoreData: false,
      };
    case GET_FEED_LIST_INDICATOR:
      return {
        ...state,
        isSuccessful: false,
        loading: true,
        errorMsg: "",
        error: false,
      };
    case GET_FEED_LIST_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        error: false,
        errorMsg: "",
        feedData: state.feedData?.concat(action.response.data),
        //feedData: action.response.data,
        isMoreData: action.response.data?.length > 0 ? true : false,
        recordOffset:
          action.response.data?.length > 0 ? state.recordOffset + 10 : 0,
      };

    case GET_FEED_LIST_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        errorMsg: action.message,
        error: true,
      };
    case RESER_LOADER:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        error: false,
        errorMsg: "",
      };
    default:
      return state;
  }
}
