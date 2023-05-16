import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const createCollab = mirrorKeyValue([
  "COUNT_COLLAB",
  "COUNT_COLLAB_INDICATOR",
  "COUNT_COLLAB_SUCCESS",
  "COUNT_COLLAB_FAILED",
  "GET_COLLAB",
  "GET_COLLAB_INDICATOR",
  "GET_COLLAB_SUCCESS",
  "GET_COLLAB_FAILED",
  "ADD_COLLAB",
  "ADD_COLLAB_INDICATOR",
  "ADD_COLLAB_SUCCESS",
  "ADD_COLLAB_FAILED",
  "ADD_SUBJECT",
  "ADD_DESCRIPTION",
  "ADD_RECIEVER_USERID",
  "ADD_PRICE_DETAILS",
  "RESET_COLLAB",
  "ADD_PARTICIPANT",
  "REMOVE_PARTICIPANT",
  "COUNT_COLLAB_RESET",
]);

const {
  COUNT_COLLAB,
  COUNT_COLLAB_INDICATOR,
  COUNT_COLLAB_SUCCESS,
  COUNT_COLLAB_FAILED,
  GET_COLLAB,
  GET_COLLAB_INDICATOR,
  GET_COLLAB_SUCCESS,
  GET_COLLAB_FAILED,
  ADD_COLLAB,
  ADD_COLLAB_INDICATOR,
  ADD_COLLAB_SUCCESS,
  ADD_COLLAB_FAILED,
  ADD_SUBJECT,
  ADD_DESCRIPTION,
  ADD_RECIEVER_USERID,
  ADD_PRICE_DETAILS,
  RESET_COLLAB,
  ADD_PARTICIPANT,
  REMOVE_PARTICIPANT,
  COUNT_COLLAB_RESET,
} = createCollab;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  collabData: {},
  loading: false,
  error: false,
  errorMsg: "",
  isSuccessfull: false,
  countData: 0,
  countLoading: false,
  countError: false,
  countErrorMsg: "",
  countIsSuccessfull: false,
  subject: "",
  description: "",
  receiverUserId: "",
  priceDetails: {},
  participants: [],
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case COUNT_COLLAB:
      return { ...state, ...data };
    case COUNT_COLLAB_INDICATOR:
      return {
        ...state,
        countLoading: true,
        countErrorMsg: "",
        countIsSuccessfull: false,
        countError: false,
        countData: "...",
      };
    case COUNT_COLLAB_SUCCESS:
      return {
        ...state,
        countLoading: false,
        countError: false,
        countErrorMsg: "",
        countIsSuccessfull: true,
        countData: action.response.data,
      };

    case COUNT_COLLAB_FAILED:
      return {
        ...state,
        countLoading: false,
        errorMsg: action.message,
        countErrorMsg: true,
        countIsSuccessfull: false,
        countData: 0,
      };
    case COUNT_COLLAB_RESET:
      return {
        ...state,
        countData: 0,
      };
    case GET_COLLAB:
      return { ...state, ...data };
    case GET_COLLAB_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case GET_COLLAB_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
        collabData: action.response.data,
      };

    case GET_COLLAB_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case ADD_COLLAB:
      return { ...state, ...data };
    case ADD_COLLAB_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case ADD_COLLAB_SUCCESS:
      const response = action.response.data;
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
      };

    case ADD_COLLAB_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case RESET_COLLAB:
      return INITIAL_STATE;
    case ADD_SUBJECT:
      return {
        ...state,
        subject: action.subject,
      };
    case ADD_DESCRIPTION:
      return {
        ...state,
        description: action.description,
      };
    case ADD_RECIEVER_USERID:
      return {
        ...state,
        receiverUserId: action.receiverUserId,
      };
    case ADD_PRICE_DETAILS:
      return {
        ...state,
        priceDetails: action.priceDetails,
      };
    case ADD_PARTICIPANT:
      return { ...state, participants: action.participants };
    case REMOVE_PARTICIPANT:
      return { ...state, participants: action.participants };
    default:
      return state;
  }
}
