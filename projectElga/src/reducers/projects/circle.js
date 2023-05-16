import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const circleTypes = mirrorKeyValue([
  "GET_CIRCLE_DATA",
  "GET_CIRCLE_SEARCH_DATA",
  "GET_CIRCLE_DATA_INDICATOR",
  "GET_CIRCLE_DATA_SUCCESS",
  "GET_CIRCLE_DATA_FAILED",
  "DELETE_CIRCLE_DATA",
  "DELETE_CIRCLE_DATA_INDICATOR",
  "DELETE_CIRCLE_DATA_SUCCESS",
  "DELETE_CIRCLE_DATA_FAILED",
  "ACCEPT_CIRCLE_DATA",
  "ACCEPT_CIRCLE_DATA_INDICATOR",
  "ACCEPT_CIRCLE_DATA_SUCCESS",
  "ACCEPT_CIRCLE_DATA_FAILED",
  "SEND_CIRCLE_REQ",
  "SEND_CIRCLE_REQ_INDICATOR",
  "SEND_CIRCLE_REQ_SUCCESS",
  "SEND_CIRCLE_REQ_FAILED",
  "SET_USER_SAVED_REDUCER",
  "GET_CIRCLE_DATA_SUCCESS_PENDING",
  "GET_CIRCLE_DATA_SUCCESS_SENT",
  "RESET_SUCCESS",
  "RESET_CIRCLE_DATA",
]);

const {
  GET_CIRCLE_DATA,
  GET_CIRCLE_SEARCH_DATA,
  GET_CIRCLE_DATA_INDICATOR,
  GET_CIRCLE_DATA_SUCCESS,
  GET_CIRCLE_DATA_FAILED,
  DELETE_CIRCLE_DATA,
  DELETE_CIRCLE_DATA_INDICATOR,
  DELETE_CIRCLE_DATA_SUCCESS,
  DELETE_CIRCLE_DATA_FAILED,
  ACCEPT_CIRCLE_DATA,
  ACCEPT_CIRCLE_DATA_INDICATOR,
  ACCEPT_CIRCLE_DATA_SUCCESS,
  ACCEPT_CIRCLE_DATA_FAILED,
  SEND_CIRCLE_REQ,
  SEND_CIRCLE_REQ_INDICATOR,
  SEND_CIRCLE_REQ_SUCCESS,
  SEND_CIRCLE_REQ_FAILED,
  SET_USER_SAVED_REDUCER,
  GET_CIRCLE_DATA_SUCCESS_PENDING,
  GET_CIRCLE_DATA_SUCCESS_SENT,
  RESET_SUCCESS,
  RESET_CIRCLE_DATA,
} = circleTypes;

/* ------------- Initial State ------------- */
//doing this
const INITIAL_STATE = {
  circleData: [],
  loading: false,
  error: false,
  errorMsg: "",
  deleteResponse: [],
  deleteLoading: false,
  deleteError: false,
  deleteErrorMsg: "",
  deleteSuccess: false,
  acceptResponse: [],
  acceptLoading: false,
  acceptError: false,
  acceptErrorMsg: "",
  acceptSuccess: false,
  sendResponse: [],
  sendLoading: false,
  sendError: false,
  sendErrorMsg: "",
  sendResponseSuccess: false,
  savedArray: [],
  circleDataPending: [],
  circleDataSent: []

};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_CIRCLE_DATA:
      return { ...state, ...data };
    case GET_CIRCLE_SEARCH_DATA:
      return { ...state, ...data };
    case GET_CIRCLE_DATA_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        error: false,
      };
    case GET_CIRCLE_DATA_SUCCESS:
      const arr = action.response.data;
      let savedArray = arr.filter((x) => {
        return x.isSaved;
      });
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        circleData: action.response.data,
        savedArray: savedArray,
      };
    case GET_CIRCLE_DATA_SUCCESS_PENDING:
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        circleDataPending: action.response.data?.userList,
      };
    case GET_CIRCLE_DATA_SUCCESS_SENT:
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        circleDataSent: action.response.data?.userList,
      };
    case SET_USER_SAVED_REDUCER:
      return {
        ...state,
        savedArray: action.savedData,
      };
    case GET_CIRCLE_DATA_FAILED:
      //console.log("response in reducer error >>",action.message)

      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
      };

    case DELETE_CIRCLE_DATA:
      return { ...state, ...data };
    case DELETE_CIRCLE_DATA_INDICATOR:
      return {
        ...state,
        deleteLoading: true,
        deleteErrorMsg: "",
        deleteError: false,
        deleteSuccess: false
      };
    case DELETE_CIRCLE_DATA_SUCCESS:
      const deleteResponse = action.response.data;
      return {
        ...state,
        deleteLoading: false,
        deleteError: false,
        deleteErrorMsg: "",
        deleteResponse: action.response.data,
        deleteSuccess: true
      };
    case DELETE_CIRCLE_DATA_FAILED:
      //console.log("response in reducer error >>",action.message)

      return {
        ...state,
        deleteLoading: false,
        deleteErrorMsg: action.message,
        deleteError: true,
        deleteSuccess: false
      };

    case ACCEPT_CIRCLE_DATA:
      return { ...state, ...data };
    case ACCEPT_CIRCLE_DATA_INDICATOR:
      return {
        ...state,
        acceptLoading: true,
        acceptErrorMsg: "",
        acceptError: false,
        acceptSuccess: false,
      };
    case ACCEPT_CIRCLE_DATA_SUCCESS:
      const acceptResponse = action.response.data;
      return {
        ...state,
        acceptLoading: false,
        acceptError: false,
        acceptErrorMsg: "",
        acceptResponse: action.response.data,
        acceptSuccess: true,
      };
    case ACCEPT_CIRCLE_DATA_FAILED:
      //console.log("response in reducer error >>",action.message)

      return {
        ...state,
        acceptLoading: false,
        acceptErrorMsg: action.message,
        acceptError: true,
        acceptSuccess: false,
      };

    case SEND_CIRCLE_REQ:
      return { ...state, ...data };
    case SEND_CIRCLE_REQ_INDICATOR:
      return {
        ...state,
        sendLoading: true,
        sendErrorMsg: "",
        sendError: false,
      };
    case SEND_CIRCLE_REQ_SUCCESS:
      const sendResponse = action.response.data;

      return {
        ...state,
        sendLoading: false,
        sendError: false,
        sendErrorMsg: "",
        sendResponse: action.response.data,
        sendResponseSuccess: true,
      };
    case SEND_CIRCLE_REQ_FAILED:

      return {
        ...state,
        sendLoading: false,
        sendErrorMsg: action.message,
        sendError: true,
      };
    case RESET_SUCCESS:
      return {
        sendResponseSuccess: false,
        acceptSuccess: false,
      };
    case RESET_CIRCLE_DATA:
        return {
          circleData: [],
        };
    default:
      return state;
  }
}
