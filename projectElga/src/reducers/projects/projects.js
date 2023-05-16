import mirrorKeyValue from "mirror-key-value";
/* ------------- Types ------------- */

export const projectTypes = mirrorKeyValue([
  "GET_PROJECT_LIST",
  "GET_PROJECT_SCHEDULAR_LIST",
  "UPDATE_PROJECT_LIST",
  "GET_PROJECT_LIST_INDICATOR",
  "GET_PROJECT_LIST_SUCCESS",
  "GET_PROJECT_LIST_FAILED",
  "GET_PENDING_PROJECT_LIST",
  "GET_PENDING_PROJECT_LIST_INDICATOR",
  "GET_PENDING_PROJECT_LIST_SUCCESS",
  "GET_PENDING_PROJECT_LIST_FAILED",
  "GET_SENT_PROJECT_LIST",
  "GET_SENT_PROJECT_LIST_INDICATOR",
  "GET_SENT_PROJECT_LIST_SUCCESS",
  "GET_SENT_PROJECT_LIST_FAILED",
]);

const {
  GET_PROJECT_LIST,
  GET_PROJECT_SCHEDULAR_LIST,
  UPDATE_PROJECT_LIST,
  GET_PROJECT_LIST_INDICATOR,
  GET_PROJECT_LIST_SUCCESS,
  GET_PROJECT_LIST_FAILED,
  GET_PENDING_PROJECT_LIST,
  GET_PENDING_PROJECT_LIST_INDICATOR,
  GET_PENDING_PROJECT_LIST_SUCCESS,
  GET_PENDING_PROJECT_LIST_FAILED,
  GET_SENT_PROJECT_LIST,
  GET_SENT_PROJECT_LIST_INDICATOR,
  GET_SENT_PROJECT_LIST_SUCCESS,
  GET_SENT_PROJECT_LIST_FAILED,
  
} = projectTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  projectsData: [],
  pendingProjectsData: [],
  sentProjectsData: [],
  loading: false,
  errorMsg: "",
  error: false,
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_PROJECT_LIST:
      return { ...state, ...data };
    case GET_PROJECT_SCHEDULAR_LIST:
      return { ...state, ...data };
    case UPDATE_PROJECT_LIST:
      return { ...state, projectsData: action.projects };
    case GET_PROJECT_LIST_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        error: false,
        projectsData:[]
      };
    case GET_PROJECT_LIST_SUCCESS:
      const response = action.response.data;
      return {
        ...state,
        loading: false,
        error: false,
        projectsData: action.response.data,
        errorMsg: "",
      };

    case GET_PROJECT_LIST_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
      };
      case GET_PENDING_PROJECT_LIST:
        return { ...state, ...data };
      case  GET_PENDING_PROJECT_LIST_INDICATOR:
        return {
          ...state,
          loading: true,
          errorMsg: "",
          error: false,
          pendingProjectsData:[]
        };
      case GET_PENDING_PROJECT_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          pendingProjectsData: action.response.data,
          errorMsg: "",
        };
      case GET_PENDING_PROJECT_LIST_FAILED:
        return {
          ...state,
          loading: false,
          errorMsg: action.message,
          error: true,
        };
      case  GET_SENT_PROJECT_LIST:
        return { ...state, ...data };

      case GET_SENT_PROJECT_LIST_INDICATOR:
        return {
          ...state,
          loading: true,
          errorMsg: "",
          error: false,
          sentProjectsData:[]
        };
      case GET_SENT_PROJECT_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          sentProjectsData: action.response.data,
          errorMsg: "",
        };
      case  GET_SENT_PROJECT_LIST_FAILED:
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
