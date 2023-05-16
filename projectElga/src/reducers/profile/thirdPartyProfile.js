import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const thirdPartyProfileTypes = mirrorKeyValue([
  "UPDATE_PROFILE",
  "UPDATE_PROFILE_INDICATOR",
  "UPDATE_PROFILE_SUCCESS",
  "UPDATE_PROFILE_FAILED",
  "GET_TPP_PROFILE_DATA",
  "GET_TPP_PROFILE_DATA_INDICATOR",
  "GET_TPP_PROFILE_DATA_SUCCESS",
  "GET_TPP_PROFILE_DATA_FAILED",
  "GET_TPP_PROFILE_DATA_RESET",
  "SAVED_PROFILE",
  "UNSAVED_PROFILE",
  "SET_CATEGORY_ARRAY_FOR_EDIT",
  "SET_GENRE_ARRAY_FOR_EDIT",
  "RESET_PROFILE_API",
  "RESET_VISITED_PROFILE",
  "GET_PROFILE_IS_VISITED",
  "GET_PROFILE_IS_VISITED_INDICATOR",
  "GET_PROFILE_IS_VISITED_SUCCESS",
  "GET_PROFILE_IS_VISITED_FAILED",
  "GET_PROFILE_IS_VISITED_RESET",
]);

const {
  UPDATE_PROFILE,
  UPDATE_PROFILE_INDICATOR,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  GET_TPP_PROFILE_DATA,
  GET_TPP_PROFILE_DATA_INDICATOR,
  GET_TPP_PROFILE_DATA_SUCCESS,
  GET_TPP_PROFILE_DATA_FAILED,
  GET_TPP_PROFILE_DATA_RESET,
  SAVED_PROFILE,
  UNSAVED_PROFILE,
  SET_CATEGORY_ARRAY_FOR_EDIT,
  SET_GENRE_ARRAY_FOR_EDIT,
  RESET_PROFILE_API,
  RESET_VISITED_PROFILE,
  GET_PROFILE_IS_VISITED,
  GET_PROFILE_IS_VISITED_INDICATOR,
  GET_PROFILE_IS_VISITED_SUCCESS,
  GET_PROFILE_IS_VISITED_FAILED,
  GET_PROFILE_IS_VISITED_RESET,
} = thirdPartyProfileTypes;

/* ------------- Initial State ------------- */
//doing this
const INITIAL_STATE = {
  tppProfileData: {},
  categoriesArr: [],
  genreArr: [],
  gtProfileloading: true,
  gtProfileerror: false,
  gtProfileerrorMsg: "",
  loading: false,
  error: false,
  errorMsg: "",
  isAdddedSuccess: false,
  isSaved: false,
  isVisted: true
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_TPP_PROFILE_DATA:
      return { ...state, ...data };
    case GET_TPP_PROFILE_DATA_INDICATOR:
      return {
        ...state,
        gtProfileloading: true,
        gtProfileerrorMsg: "",
        gtProfileerror: false,
      };
    case GET_TPP_PROFILE_DATA_SUCCESS:
      const profileResponse = action.response.data;
      return {
        ...state,
        gtProfileloading: false,
        gtProfileerror: false,
        gtProfileerrorMsg: "",
        tppProfileData: action.response.data,
        categoriesArr: profileResponse?.subCategoryNames,
        genreArr: profileResponse?.tag,
        isSaved: profileResponse?.isSaved,
      };
    case GET_TPP_PROFILE_DATA_RESET:
      return {
        ...state,
        gtProfileloading: false,
        gtProfileerror: false,
        gtProfileerrorMsg: "",
        tppProfileData: {},
        categoriesArr: [],
        isSaved: false,
      };
    case SAVED_PROFILE:
      return {
        ...state,
        isSaved: true,
      };
    case UNSAVED_PROFILE:
      return {
        ...state,
        isSaved: false,
      };
    case GET_TPP_PROFILE_DATA_FAILED:
      return {
        ...state,
        gtProfileloading: false,
        gtProfileerrorMsg: action.message,
        gtProfileerror: true,
      };
    case SET_CATEGORY_ARRAY_FOR_EDIT:
      return {
        ...state,
        categoriesArr: action.data,
      };
    case SET_GENRE_ARRAY_FOR_EDIT:
      return {
        ...state,
        genreArr: action.data,
      };
    case UPDATE_PROFILE:
      return { ...state, ...data };
    case UPDATE_PROFILE_INDICATOR:
      return { ...state, loading: true, errorMsg: "", error: false };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isAdddedSuccess: true,
      };
    case UPDATE_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
      };
    case RESET_PROFILE_API:
      return INITIAL_STATE
    case RESET_VISITED_PROFILE:
      return {
        ...state,
        isVisted: true
      }
    case GET_PROFILE_IS_VISITED:
      return { ...state, ...data };

    case GET_PROFILE_IS_VISITED_INDICATOR:
      return {
        ...state,
        isVisted: true
      };
    case GET_PROFILE_IS_VISITED_SUCCESS:
      const isVistedResponse = action.response.data;
      console.log("response-------------->", isVistedResponse)
      return {
        ...state,
        isVisted: isVistedResponse
      };
    case GET_PROFILE_IS_VISITED_FAILED:
      return {
        ...state,
        isVisted: true
      };
    case GET_PROFILE_IS_VISITED_RESET:
      return { ...state, isVisted: true };
    default:
      return state;
  }
}
