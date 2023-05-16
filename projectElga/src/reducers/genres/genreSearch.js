import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const genreSearchTypes = mirrorKeyValue([
  "SEARCH_GENRE",
  "SEARCH_GENRE_INDICATOR",
  "SEARCH_GENRE_SUCCESS",
  "SEARCH_GENRE_FAILED",
  "RESET_SEARCH_GENRE",
]);

const {
  SEARCH_GENRE,
  SEARCH_GENRE_INDICATOR,
  SEARCH_GENRE_SUCCESS,
  SEARCH_GENRE_FAILED,
  RESET_SEARCH_GENRE,
} = genreSearchTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  loading: false,
  error: false,
  errorMsg: "",
  isSuccessfull: false,
  genreSearchData: []
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case SEARCH_GENRE:
      return { ...state, ...data };
    case SEARCH_GENRE_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case SEARCH_GENRE_SUCCESS:
      const response = action.response;
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
        genreSearchData: response.data
      };

    case SEARCH_GENRE_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case RESET_SEARCH_GENRE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
