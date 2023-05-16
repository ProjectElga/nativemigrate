import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const profileTypes = mirrorKeyValue([
  "UPDATE_PROFILE",
  "UPDATE_PROFILE_INDICATOR",
  "UPDATE_PROFILE_SUCCESS",
  "UPDATE_PROFILE_FAILED",
  "GET_PROFILE_DATA",
  "GET_PROFILE_DATA_INDICATOR",
  "GET_PROFILE_DATA_SUCCESS",
  "GET_PROFILE_DATA_FAILED",
  "GET_PROFILE_DATA_RESET",
  "SAVED_PROFILE",
  "UNSAVED_PROFILE",
  "SET_CATEGORY_ARRAY_FOR_EDIT",
  "SET_GENRE_ARRAY_FOR_EDIT",
  "RESET_PROFILE_API",
  "RESET_VISITED_PROFILE"
]);

const {
  UPDATE_PROFILE,
  UPDATE_PROFILE_INDICATOR,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  GET_PROFILE_DATA,
  GET_PROFILE_DATA_INDICATOR,
  GET_PROFILE_DATA_SUCCESS,
  GET_PROFILE_DATA_FAILED,
  GET_PROFILE_DATA_RESET,
  SAVED_PROFILE,
  UNSAVED_PROFILE,
  SET_CATEGORY_ARRAY_FOR_EDIT,
  SET_GENRE_ARRAY_FOR_EDIT,
  RESET_PROFILE_API,
  RESET_VISITED_PROFILE
} = profileTypes;

/* ------------- Initial State ------------- */
//doing this
const INITIAL_STATE = {
  profileData: {},
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
  isVisted: false
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_PROFILE_DATA:
      return { ...state, ...data };
    case GET_PROFILE_DATA_INDICATOR:
      return {
        ...state,
        gtProfileloading: true,
        gtProfileerrorMsg: "",
        gtProfileerror: false,
      };
    case GET_PROFILE_DATA_SUCCESS:
      const profileResponse = action.response.data;
      return {
        ...state,
        gtProfileloading: false,
        gtProfileerror: false,
        gtProfileerrorMsg: "",
        profileData: action.response.data,
        categoriesArr: profileResponse?.subCategoryNames,
        genreArr: profileResponse?.tag,
        isSaved: profileResponse?.isSaved,
        isVisted: true
      };
    case GET_PROFILE_DATA_RESET:
      return {
        ...state,
        gtProfileloading: false,
        gtProfileerror: false,
        gtProfileerrorMsg: "",
        profileData: {},
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
    case GET_PROFILE_DATA_FAILED:
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
        isVisted: false
      }
    default:
      return state;
  }
}
