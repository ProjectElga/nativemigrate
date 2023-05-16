import mirrorKeyValue from "mirror-key-value";
/* ------------- Types ------------- */

export const archiveChatTypes = mirrorKeyValue([
  "GET_ARCHIVE_CHAT",
  "GET_ARCHIVE_CHAT_INDICATOR",
  "GET_ARCHIVE_CHAT_SUCCESS",
  "GET_ARCHIVE_CHAT_FAILED",
]);

const {
  GET_ARCHIVE_CHAT,
  GET_ARCHIVE_CHAT_INDICATOR,
  GET_ARCHIVE_CHAT_SUCCESS,
  GET_ARCHIVE_CHAT_FAILED,
} = archiveChatTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  projectDetailData: [],
  loading: false,
  errorMsg: "",
  error: false,
  isArchiveSuccess: false
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case GET_ARCHIVE_CHAT:
      return { ...state, ...data };
    case GET_ARCHIVE_CHAT_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        error: false,
      };
    case GET_ARCHIVE_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        projectDetailData: action.response.data,
        errorMsg: "",
        isArchiveSuccess: true
      };

    case GET_ARCHIVE_CHAT_FAILED:

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
