import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const popularGenreTypes = mirrorKeyValue([
  "GET_POPULAR_GENRE",
  "GET_POPULAR_GENRE_INDICATOR",
  "GET_POPULAR_GENRE_SUCCESS",
  "GET_POPULAR_GENRE_FAILED",
  "RESET_GET_POPULAR_GENRE",
]);

const {
  GET_POPULAR_GENRE,
  GET_POPULAR_GENRE_INDICATOR,
  GET_POPULAR_GENRE_SUCCESS,
  GET_POPULAR_GENRE_FAILED,
  RESET_GET_POPULAR_GENRE,
} = popularGenreTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  loading: false,
  error: false,
  errorMsg: "",
  isSuccessfull: false,
  popularGenreData: []
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_POPULAR_GENRE:
      return { ...state, ...data };
    case GET_POPULAR_GENRE_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case GET_POPULAR_GENRE_SUCCESS:
      const response = action.response;
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
        popularGenreData: response.data
      };

    case GET_POPULAR_GENRE_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case RESET_GET_POPULAR_GENRE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
