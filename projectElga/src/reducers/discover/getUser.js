import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const getUserDiscoverTypes = mirrorKeyValue([
  "GET_USER_DISCOVERY",
  "GET_TRENDING_USER_DISCOVERY",
  "GET_NEAR_BY_USER_DISCOVERY",
  "GET_USER_DISCOVERY_INDICATOR",
  "GET_USER_DISCOVERY_SUCCESS",
  "GET_USER_DISCOVERY_FAILED",
  "SET_USER_SAVED_REDUCER",
  "RESET_OFF_SET_VALUE",
  "RESER_LOADER",
  "RESET_REDUCER",
]);

const {
  GET_USER_DISCOVERY,
  GET_TRENDING_USER_DISCOVERY,
  GET_NEAR_BY_USER_DISCOVERY,
  GET_USER_DISCOVERY_INDICATOR,
  GET_USER_DISCOVERY_SUCCESS,
  GET_USER_DISCOVERY_FAILED,
  SET_USER_SAVED_REDUCER,
  RESET_OFF_SET_VALUE,
  RESER_LOADER,
  RESET_REDUCER,
} = getUserDiscoverTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  isSuccessful: false,
  guloading: false,
  guError: false,
  guErrorMsg: "",
  getDiscoverUser: [],
  savedArray: [],
  recordOffset: 0,
  recordPerPage: 10,
  isMoreData: false,
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_USER_DISCOVERY:
      return { ...state, ...data };
    case GET_TRENDING_USER_DISCOVERY:
      return { ...state, ...data };
    case GET_NEAR_BY_USER_DISCOVERY:
      return { ...state, ...data };
    case RESET_OFF_SET_VALUE:
      return {
        ...state,
        recordOffset: 0,
        recordPerPage: 10,
        getDiscoverUser: [],
        isMoreData: false,
      };
    case GET_USER_DISCOVERY_INDICATOR:
      return {
        ...state,
        isSuccessful: false,
        guloading: true,
        guErrorMsg: "",
        guError: false,
        savedArray: [],
      };
    case GET_USER_DISCOVERY_SUCCESS:
      const arr = state.getDiscoverUser?.concat(action.response.data);
      let savedArray = arr.filter((x) => {
        return x.isSaved;
      });
      return {
        ...state,
        isSuccessful: true,
        guloading: false,
        guError: false,
        guErrorMsg: "",
        getDiscoverUser: state.getDiscoverUser?.concat(action.response.data),
        //getDiscoverUser: action.response.data,
        isMoreData: action.response.data?.length > 0 ? true : false,
        recordOffset:
          action.response.data?.length > 0 ? state.recordOffset + 10 : 0,
        savedArray: savedArray,
      };
    case SET_USER_SAVED_REDUCER:
      return {
        ...state,
        savedArray: action.savedData,
      };
    case GET_USER_DISCOVERY_FAILED:
      return {
        ...state,
        isSuccessful: false,
        guloading: false,
        guErrorMsg: action.message,
        guError: true,
      };
    case RESER_LOADER:
      return {
        ...state,
        isSuccessful: false,
        guloading: false,
        guError: false,
        guErrorMsg: "",
      };
    case RESET_REDUCER:
      return {
        ...state,
        getDiscoverUser: [],
      };
    default:
      return state;
  }
}
