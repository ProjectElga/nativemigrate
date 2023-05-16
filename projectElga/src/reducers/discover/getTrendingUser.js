import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const getTrendingUserDiscoverTypes = mirrorKeyValue([
  "GET_TRENDING_USER_DISCOVERY",
  "GET_TRENDING_USER_DISCOVERY_INDICATOR",
  "GET_TRENDING_USER_DISCOVERY_SUCCESS",
  "GET_TRENDING_USER_DISCOVERY_FAILED",
]);

const {
  GET_TRENDING_USER_DISCOVERY,
  GET_TRENDING_USER_DISCOVERY_INDICATOR,
  GET_TRENDING_USER_DISCOVERY_SUCCESS,
  GET_TRENDING_USER_DISCOVERY_FAILED,
} = getTrendingUserDiscoverTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  guloading: false,
  guError: false,
  guErrorMsg: "",
  getTrendingUsers: {},
  savedArray: []
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_TRENDING_USER_DISCOVERY:
      return { ...state, ...data };
    case GET_TRENDING_USER_DISCOVERY_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        error: false,
      };
    case GET_TRENDING_USER_DISCOVERY_SUCCESS:
      const arr = action.response.data;
      let savedArray = arr.filter((x) => { return x.isSaved; })
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        getTrendingUsers: action.response.data,
        savedArray: savedArray
      };
    case GET_TRENDING_USER_DISCOVERY_FAILED:
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
