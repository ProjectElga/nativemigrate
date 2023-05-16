import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const categoryTypes = mirrorKeyValue([
  "GET_USER_CATEGORY_LIST",
  "GET_USER_CATEGORY_LIST_INDICATOR",
  "GET_USER_CATEGORY_LIST_SUCCESS",
  "GET_USER_CATEGORY_LIST_FAILED",
  "RESET_CATEGORY_LIST",
  "ASSIGN_SUB_CATEGORIES",
  "ASSIGN_SUB_CATEGORIES_INDICATOR",
  "ASSIGN_SUB_CATEGORIES_SUCCESS",
  "ASSIGN_SUB_CATEGORIES_FAILED",
]);

const {
  GET_USER_CATEGORY_LIST,
  GET_USER_CATEGORY_LIST_INDICATOR,
  GET_USER_CATEGORY_LIST_SUCCESS,
  GET_USER_CATEGORY_LIST_FAILED,
  RESET_CATEGORY_LIST,
  ASSIGN_SUB_CATEGORIES,
  ASSIGN_SUB_CATEGORIES_INDICATOR,
  ASSIGN_SUB_CATEGORIES_SUCCESS,
  ASSIGN_SUB_CATEGORIES_FAILED,
} = categoryTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  loading: false,
  error: false,
  errorMsg: "",
  categoryData: [],
  isSuccessfull: false,
  isAssignedSuccess: false,
  assignloading: false,
  assignerror: false,
  assignerrorMsg: "",
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_USER_CATEGORY_LIST:
      return { ...state, ...data };
    case GET_USER_CATEGORY_LIST_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case GET_USER_CATEGORY_LIST_SUCCESS:
      const response = action.response.data;
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        categoryData: response,
        isSuccessfull: true,
      };

    case GET_USER_CATEGORY_LIST_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case RESET_CATEGORY_LIST:
      return INITIAL_STATE;
    case ASSIGN_SUB_CATEGORIES:
      return {
        ...state,...data
      };
    case ASSIGN_SUB_CATEGORIES_INDICATOR:
      return {
        ...state,
        assignloading: true,
        assignerrorMsg: "",
        assignerror: false,
      };
    case ASSIGN_SUB_CATEGORIES_SUCCESS:
      const SubCategoryResponse = action.response.data
      return {
        ...state,
        assignloading: false,
        assignerror: false,
        assignerrorMsg: "",
        isAssignedSuccess: true,
       // SubCategoryResponse:SubCategoryResponse
      };

    case ASSIGN_SUB_CATEGORIES_FAILED:
      return {
        ...state,
        assignloading: false,
        assignerrorMsg: action.message,
        assignerror: true,
      };
    default:
      return state;
  }
}
