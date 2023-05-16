import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const genreAssignTypes = mirrorKeyValue([
  "ASSIGN_GENRE",
  "ASSIGN_GENRE_INDICATOR",
  "ASSIGN_GENRE_SUCCESS",
  "ASSIGN_GENRE_FAILED",
  "RESET_ASSIGN_GENRE",
]);

const {
  ASSIGN_GENRE,
  ASSIGN_GENRE_INDICATOR,
  ASSIGN_GENRE_SUCCESS,
  ASSIGN_GENRE_FAILED,
  RESET_ASSIGN_GENRE,
} = genreAssignTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  loading: false,
  error: false,
  errorMsg: "",
  isSuccessfull: false,
  genreResponse: {},
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case ASSIGN_GENRE:
      return { ...state, ...data };
    case ASSIGN_GENRE_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case ASSIGN_GENRE_SUCCESS:
      const response = action.response;
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
        genreResponse: response,
      };

    case ASSIGN_GENRE_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case RESET_ASSIGN_GENRE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
