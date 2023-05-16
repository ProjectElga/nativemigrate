import mirrorKeyValue from "mirror-key-value";
/* ------------- Types ------------- */

export const projectDetailTypes = mirrorKeyValue([
  "GET_PROJECT_DETAIL_LIST",
  "GET_PROJECT_DETAIL_LIST_INDICATOR",
  "GET_PROJECT_DETAIL_LIST_SUCCESS",
  "GET_PROJECT_DETAIL_LIST_FAILED",
]);

const {
  GET_PROJECT_DETAIL_LIST,
  GET_PROJECT_DETAIL_LIST_INDICATOR,
  GET_PROJECT_DETAIL_LIST_SUCCESS,
  GET_PROJECT_DETAIL_LIST_FAILED,
} = projectDetailTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  projectDetailData: [],
  loading: false,
  errorMsg: "",
  error: false,
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_PROJECT_DETAIL_LIST:
      return { ...state, ...data };
    case GET_PROJECT_DETAIL_LIST_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        error: false,
      };
    case GET_PROJECT_DETAIL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        projectDetailData: action.response.data,
        errorMsg: "",
      };

    case GET_PROJECT_DETAIL_LIST_FAILED:

      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
      };
    default:
      return state;
  }
}
