import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const linksTypes = mirrorKeyValue([
  "ADD_LINKS",
  "ADD_LINKS_INDICATOR",
  "ADD_LINKS_SUCCESS",
  "ADD_LINKS_FAILED",
  "RESET_ADD_LINKS",
  "RESET_DELETE_LINKS",
  "DELETE_LINKS",
  "DELETE_LINKS_INDICATOR",
  "DELETE_LINKS_SUCCESS",
  "DELETE_LINKS_FAILED",
  "GET_LINKS",
  "GET_LINKS_INDICATOR",
  "GET_LINKS_SUCCESS",
  "GET_LINKS_FAILED",
  "GET_LINKS_COUNT",
  "GET_LINKS_COUNT_INDICATOR",
  "GET_LINKS_COUNT_SUCCESS",
  "GET_LINKS_COUNT_FAILED",
  "GET_LINKS_COUNT_RESET"
]);

const {
  ADD_LINKS,
  ADD_LINKS_INDICATOR,
  ADD_LINKS_SUCCESS,
  ADD_LINKS_FAILED,
  RESET_ADD_LINKS,
  DELETE_LINKS,
  DELETE_LINKS_INDICATOR,
  DELETE_LINKS_SUCCESS,
  DELETE_LINKS_FAILED,
  RESET_DELETE_LINKS,
  GET_LINKS,
  GET_LINKS_INDICATOR,
  GET_LINKS_SUCCESS,
  GET_LINKS_FAILED,
  GET_LINKS_COUNT,
  GET_LINKS_COUNT_INDICATOR,
  GET_LINKS_COUNT_SUCCESS,
  GET_LINKS_COUNT_FAILED,
  GET_LINKS_COUNT_RESET
} = linksTypes;

/* ------------- Initial State ------------- */
//doing this
const INITIAL_STATE = {
  linksData: [],
  gtLinksloading: false,
  gtLinkserror: false,
  gtLinkserrorMsg: "",
  gtcLinksloading: false,
  gtcLinkserror: false,
  gtcLinkserrorMsg: "",
  gtcData: [],
  loading: false,
  error: false,
  errorMsg: "",
  dloading: false,
  derror: false,
  derrorMsg: "",
  isDeleteSuccess: false,
  isAdddedSuccess: false,
  comment: "",
  gtcSuccessFull: false
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_LINKS:
      return { ...state, ...data };
    case GET_LINKS_INDICATOR:
      return {
        ...state,
        gtLinksloading: true,
        gtLinkserrorMsg: "",
        gtLinkserror: false,
        linksData: []
      };
    case GET_LINKS_SUCCESS:
      return {
        ...state,
        gtLinksloading: false,
        gtLinkserror: false,
        gtLinkserrorMsg: "",
        linksData: action.response.data,
        isAdddedSuccess: false,
      };
    case GET_LINKS_FAILED:
      return {
        ...state,
        gtLinksloading: false,
        gtLinkserrorMsg: action.message,
        gtLinkserror: true,
      };
    case ADD_LINKS:
      return { ...state, comment: action.comment };
    case ADD_LINKS_INDICATOR:
      return { ...state, loading: true, errorMsg: "", error: false };
    case ADD_LINKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isAdddedSuccess: true,
      };
    case ADD_LINKS_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
      };
    case RESET_ADD_LINKS:
      return {
        ...state,
        isAdddedSuccess: false,
      }
    case DELETE_LINKS:
      return { ...state, comment: action.comment };
    case DELETE_LINKS_INDICATOR:
      return { ...state, dloading: true, derrorMsg: "", derror: false };
    case DELETE_LINKS_SUCCESS:
      return {
        ...state,
        dloading: false,
        derror: false,
        derrorMsg: "",
        isDeleteSuccess: true,
      };
    case DELETE_LINKS_FAILED:
      return {
        ...state,
        dloading: false,
        derrorMsg: action.message,
        derror: true,
      };
    case RESET_DELETE_LINKS:
      return {
        ...state,
        isDeleteSuccess: false,
      }
    case GET_LINKS_COUNT:
      return { ...state, ...data };
    case GET_LINKS_COUNT_INDICATOR:
      return {
        ...state,
        gtcLinksloading: true,
        gtcLinkserrorMsg: "",
        gtcLinkserror: false,
        gtcData: [],
        gtcSuccessFull: false
      };
    case GET_LINKS_COUNT_SUCCESS:
      return {
        ...state,
        gtcLinksloading: false,
        gtcLinkserrorMsg: "",
        gtcLinkserror: false,
        gtcData: action.response.data,
        gtcSuccessFull: true
      };
    case GET_LINKS_COUNT_FAILED:
      return {
        ...state,
        gtcLinksloading: false,
        gtcLinkserrorMsg: action.message,
        gtcLinkserror: true,
        gtcData: [],
        gtcSuccessFull: false
      };
    case GET_LINKS_COUNT_RESET:
      return {
        ...state,
        gtcLinksloading: false,
        gtcLinkserrorMsg: "",
        gtcLinkserror: false,
        gtcData: [],
        gtcSuccessFull: false
      };
    default:
      return state;
  }
}
