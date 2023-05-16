import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const updateMedia = mirrorKeyValue([
  "ADD_MEDIA",
  "ADD_MEDIA_INDICATOR",
  "ADD_MEDIA_SUCCESS",
  "ADD_MEDIA_FAILED",
  "GET_MEDIA",
  "GET_MEDIA_INDICATOR",
  "GET_MEDIA_SUCCESS",
  "GET_MEDIA_FAILED",
  "DELETE_MEDIA",
  "DELETE_MEDIA_INDICATOR",
  "DELETE_MEDIA_SUCCESS",
  "DELETE_MEDIA_FAILED",
]);

const {
  ADD_MEDIA,
  ADD_MEDIA_INDICATOR,
  ADD_MEDIA_SUCCESS,
  ADD_MEDIA_FAILED,
  GET_MEDIA,
  GET_MEDIA_INDICATOR,
  GET_MEDIA_SUCCESS,
  GET_MEDIA_FAILED,
  DELETE_MEDIA,
  DELETE_MEDIA_INDICATOR,
  DELETE_MEDIA_SUCCESS,
  DELETE_MEDIA_FAILED,
} = updateMedia;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  addLoading: false,
  addError: false,
  addErrorMsg: "",
  addIsSuccessfull: false,
  getLoading: false,
  getError: false,
  getErrorMsg: "",
  getIsSuccessfull: false,
  mediaResponse: {},
  deleteLoading: false,
  deleteError: false,
  deleteErrorMsg: "",
  deleteIsSuccessfull: false,
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case ADD_MEDIA:
      return { ...state, ...data };
    case ADD_MEDIA_INDICATOR:
      return {
        ...state,
        addLoading: true,
        addErrorMsg: "",
        addIsSuccessfull: false,
        addError: false,
      };
    case ADD_MEDIA_SUCCESS:
      const responseData = action.response.data;
      return {
        ...state,
        addLoading: false,
        addError: false,
        addErrorMsg: "",
        addIsSuccessfull: true,
      };

    case ADD_MEDIA_FAILED:
      return {
        ...state,
        addLoading: false,
        addErrorMsg: action.message,
        addError: true,
        addIsSuccessfull: false,
      };
    case GET_MEDIA:
      return { ...state, ...data };
    case GET_MEDIA_INDICATOR:
      return {
        ...state,
        getLoading: true,
        getErrorMsg: "",
        getIsSuccessfull: false,
        getError: false,
      };
    case GET_MEDIA_SUCCESS:
      const response = action.response.data;
      return {
        ...state,
        getLoading: false,
        getError: false,
        getErrorMsg: "",
        getIsSuccessfull: true,
        mediaResponse: response,
      };

    case GET_MEDIA_FAILED:
      return {
        ...state,
        getLoading: false,
        getErrorMsg: action.message,
        getError: true,
        getIsSuccessfull: false,
      };
    case DELETE_MEDIA:
      return { ...state, ...data };
    case DELETE_MEDIA_INDICATOR:
      return {
        ...state,
        deleteLoading: true,
        deleteErrorMsg: "",
        deleteIsSuccessfull: false,
        deleteError: false,
      };
    case DELETE_MEDIA_SUCCESS:
      const responseDelete = action.response.data;
      return {
        ...state,
        deleteLoading: false,
        deleteError: false,
        deleteErrorMsg: "",
        deleteIsSuccessfull: true,
      };

    case DELETE_MEDIA_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteErrorMsg: action.message,
        deleteError: true,
        deleteIsSuccessfull: false,
      };

    default:
      return state;
  }
}
