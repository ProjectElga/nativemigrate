import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const assignIdentity = mirrorKeyValue([
  "ASSIGN_IDENTITY",
  "ASSIGN_IDENTITY_INDICATOR",
  "ASSIGN_IDENTITY_SUCCESS",
  "ASSIGN_IDENTITY_FAILED",
  "RESET_ASSIGN_IDENTITY",
]);

const {
  ASSIGN_IDENTITY,
  ASSIGN_IDENTITY_INDICATOR,
  ASSIGN_IDENTITY_SUCCESS,
  ASSIGN_IDENTITY_FAILED,
  RESET_ASSIGN_IDENTITY,
} = assignIdentity;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  loading: false,
  error: false,
  errorMsg: "",
  isSuccessfull: false,
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case ASSIGN_IDENTITY:
      return { ...state, ...data };
    case ASSIGN_IDENTITY_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        isSuccessfull: false,
        error: false,
      };
    case ASSIGN_IDENTITY_SUCCESS:
      const response = action.response.data;
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
      };

    case ASSIGN_IDENTITY_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessfull: false,
      };
    case RESET_ASSIGN_IDENTITY:
      return INITIAL_STATE;
    default:
      return state;
  }
}
