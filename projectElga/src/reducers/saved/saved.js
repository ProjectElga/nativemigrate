import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const savedTypes = mirrorKeyValue([
  "ADD_SAVED",
  "ADD_SAVED_INDICATOR",
  "ADD_SAVED_SUCCESS",
  "ADD_SAVED_FAILED",
  "SAVED_DATA",
  "SAVED_DATA_INDICATOR",
  "SAVED_DATA_SUCCESS",
  "SAVED_DATA_FAILED",
  "SET_USER_SAVED_REDUCER"
]);

const {
  ADD_SAVED,
  ADD_SAVED_INDICATOR,
  ADD_SAVED_SUCCESS,
  ADD_SAVED_FAILED,
  SAVED_DATA,
  SAVED_DATA_INDICATOR,
  SAVED_DATA_SUCCESS,
  SAVED_DATA_FAILED,
  SET_USER_SAVED_REDUCER
} = savedTypes;

/* ------------- Initial State ------------- */
//doing this
const INITIAL_STATE = {
  loading: false,
  error: false,
  errorMsg: "",
  savedData: {},
  isSuccessfull: false,
  savedloading: false,
  savederror: false,
  savederrorMsg: "",
  savedIsSuccessfull: false,
  add_success:{},
  savedArray:[]
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case ADD_SAVED:
      return { ...state, ...data };
    case ADD_SAVED_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case ADD_SAVED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
        add_success:action.response.data
      };

    case ADD_SAVED_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case SAVED_DATA:
      return { ...state, ...data };
    case SAVED_DATA_INDICATOR:
      return {
        ...state,
        savedloading: true,
        savederrorMsg: "",
        savederror: false,
        savedIsSuccessfull: false,
        savedArray: []
      };

    case SAVED_DATA_SUCCESS:
      const savedArray = action.response.data;
      return {
        ...state,
        savedloading: false,
        savederror: false,
        savederrorMsg: "",
        savedData: action.response,
        savedIsSuccessfull: true,
        savedArray:savedArray
      };
    case SET_USER_SAVED_REDUCER:
      return {
        ...state,
        savedArray: action.savedData
    };
    case SAVED_DATA_FAILED:
      return {
        ...state,
        savedloading: false,
        savederrorMsg: action.message,
        savederror: true,
        savedIsSuccessfull: false,
      };

    default:
      return state;
  }
}
