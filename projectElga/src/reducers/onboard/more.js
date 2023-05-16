import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const assignAgency = mirrorKeyValue([
  "ASSIGN_AGENCY",
  "ASSIGN_AGENCY_INDICATOR",
  "ASSIGN_AGENCY_SUCCESS",
  "ASSIGN_AGENCY_FAILED",
  "DELETE_AGENCY",
  "DELETE_AGENCY_INDICATOR",
  "DELETE_AGENCY_SUCCESS",
  "DELETE_AGENCY_FAILED",
  "GET_AGENCY",
  "GET_AGENCY_INDICATOR",
  "GET_AGENCY_SUCCESS",
  "GET_AGENCY_FAILED",
  "ADD_ORGANISTION",
  "ADD_DESIGNATION",
  "ADD_WEBSITE",
  "ADD_START_DATE",
  "ADD_END_DATE",
  "IS_WORKING_CURRENTLY",
  "RESET_ASSIGN_AGENCY",
]);

const {
  ASSIGN_AGENCY,
  ASSIGN_AGENCY_INDICATOR,
  ASSIGN_AGENCY_SUCCESS,
  ASSIGN_AGENCY_FAILED,
  DELETE_AGENCY,
  DELETE_AGENCY_INDICATOR,
  DELETE_AGENCY_SUCCESS,
  DELETE_AGENCY_FAILED,
  GET_AGENCY,
  GET_AGENCY_INDICATOR,
  GET_AGENCY_SUCCESS,
  GET_AGENCY_FAILED,
  RESET_ASSIGN_AGENCY,
  ADD_ORGANISTION,
  ADD_DESIGNATION,
  ADD_WEBSITE,
  ADD_START_DATE,
  ADD_END_DATE,
  IS_WORKING_CURRENTLY,
} = assignAgency;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  loading: false,
  error: false,
  errorMsg: "",
  isSuccessfull: false,
  getLoading: false,
  getError: false,
  getErrorMsg: "",
  getIsSuccessfull: false,
  agencyData: [],
  isChecked: false,
  startDate: new Date(),
  endDate: new Date(),
  organisationName: "",
  websiteName: "",
  designation: "",
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case ASSIGN_AGENCY:
      return { ...state, ...data };
    case ASSIGN_AGENCY_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case ASSIGN_AGENCY_SUCCESS:
      // const response = action.response.data;
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
      };

    case ASSIGN_AGENCY_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case DELETE_AGENCY:
      return { ...state, ...data };
    case DELETE_AGENCY_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        error: false,
      };
    case DELETE_AGENCY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
      };

    case DELETE_AGENCY_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
      };
    case GET_AGENCY:
      return { ...state, ...data };
    case GET_AGENCY_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case GET_AGENCY_SUCCESS:
      const getResponse = action.response.data;
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
        agencyData: getResponse,
      };

    case GET_AGENCY_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case RESET_ASSIGN_AGENCY:
      return INITIAL_STATE;
    case ADD_ORGANISTION:
      return {
        ...state,
        organisationName: action.organisationName,
      };
    case ADD_DESIGNATION:
      return {
        ...state,
        designation: action.designation,
      };
    case ADD_WEBSITE:
      return {
        ...state,
        websiteName: action.websiteName,
      };
    case ADD_START_DATE:
      return {
        ...state,
        startDate: action.startDate,
      };
    case ADD_END_DATE:
      return {
        ...state,
        endDate: action.endDate,
      };
    case IS_WORKING_CURRENTLY:
      return {
        ...state,
        isChecked: action.isChecked,
      };
    default:
      return state;
  }
}
