import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const citationTypes = mirrorKeyValue([
  "ADD_CITATION",
  "ADD_CITATION_INDICATOR",
  "ADD_CITATION_SUCCESS",
  "ADD_CITATION_FAILED",
  "RESET_ADD_CITATION",
  "GET_CITATION",
  "GET_CITATION_INDICATOR",
  "GET_CITATION_SUCCESS",
  "GET_CITATION_FAILED",
  "EDIT_CITATION",
  "EDIT_CITATION_INDICATOR",
  "EDIT_CITATION_SUCCESS",
  "EDIT_CITATION_FAILED",
  "RESET_EDIT_CITATION"
]);

const {
  ADD_CITATION,
  ADD_CITATION_INDICATOR,
  ADD_CITATION_SUCCESS,
  ADD_CITATION_FAILED,
  RESET_ADD_CITATION,
  GET_CITATION,
  GET_CITATION_INDICATOR,
  GET_CITATION_SUCCESS,
  GET_CITATION_FAILED,
  EDIT_CITATION,
  EDIT_CITATION_INDICATOR,
  EDIT_CITATION_SUCCESS,
  EDIT_CITATION_FAILED,
  RESET_EDIT_CITATION
} = citationTypes;

/* ------------- Initial State ------------- */
//doing this
const INITIAL_STATE = {
  citationData: [],
  gtloading: false,
  gterror: false,
  gterrorMsg: "",
  loading: false,
  error: false,
  errorMsg: "",
  isAdddedSuccess: false,
  comment: "",
  edSuccess: false,
  edloading: false,
  edterror: false,
  ederrorMsg: "",
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_CITATION:
      return { ...state, ...data };
    case GET_CITATION_INDICATOR:
      return {
        ...state,
        gtloading: true,
        gterrorMsg: "",
        gterror: false,
        citationData: [],
      };
    case GET_CITATION_SUCCESS:
      return {
        ...state,
        gtloading: false,
        gterror: false,
        gterrorMsg: "",
        citationData: action.response.data,
      };
    case GET_CITATION_FAILED:
      return {
        ...state,
        gtloading: false,
        gterrorMsg: action.message,
        edterror: true,
      };
    case EDIT_CITATION:
      return { ...state, ...data };
    case EDIT_CITATION_INDICATOR:
      return {
        ...state,
        edloading: true,
        ederrorMsg: "",
        edterror: false,
        edSuccess: false,
      };
    case EDIT_CITATION_SUCCESS:
      return {
        ...state,
        edloading: false,
        edterror: false,
        ederrorMsg: "",
        edSuccess: true,
      };
    case EDIT_CITATION_FAILED:
      return {
        ...state,
        edloading: false,
        ederrorMsg: action.message,
        edterror: true,
        edSuccess: false,
      };
    case ADD_CITATION:
      return { ...state, comment: action.comment };
    case ADD_CITATION_INDICATOR:
      return { ...state, loading: true, errorMsg: "", error: false };
    case ADD_CITATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isAdddedSuccess: true,
      };
    case ADD_CITATION_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
      };
    case RESET_ADD_CITATION:
      return {
        ...state,
        loading: false,
        errorMsg: "",
        error: false,
        isAdddedSuccess: false,
      };
    case RESET_EDIT_CITATION:
      return {
        ...state,
        edSuccess: false,
        edloading: false,
        edterror: false,
        ederrorMsg: "",
      };
    default:
      return state;
  }
}
