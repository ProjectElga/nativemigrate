import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const categoryTypes = mirrorKeyValue([
  "GET_CATEGORY_DATA",
  "GET_CATEGORY_DATA_INDICATOR",
  "GET_CATEGORY_DATA_SUCCESS",
  "GET_CATEGORY_DATA_FAILED",
  "RESET_LOADER"
  
]);

const {
  GET_CATEGORY_DATA,
  GET_CATEGORY_DATA_INDICATOR,
  GET_CATEGORY_DATA_SUCCESS,
  GET_CATEGORY_DATA_FAILED,
  RESET_LOADER
} = categoryTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  loading: false,
  error: false,
  errorMsg: "",
  userMeta:{},
  isSuccessfull: false,
  category_Data:{}
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_CATEGORY_DATA:
      return { ...state, ...data };
    case GET_CATEGORY_DATA_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        error: false,
        category_Data:{}
      };
    case RESET_LOADER:
      return INITIAL_STATE;
    case GET_CATEGORY_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        category_Data: action.response.data,
        isSuccessfull:true
      };
    case GET_CATEGORY_DATA_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    default:
      return state;
  }
}
