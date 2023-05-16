import mirrorKeyValue from "mirror-key-value";

/* ------------- Types ------------- */

export const updateUser = mirrorKeyValue([
  "UPDATE_USER",
  "UPDATE_USER_INDICATOR",
  "UPDATE_USER_SUCCESS",
  "UPDATE_USER_FAILED",
  "ADD_ORGANISTION",
  "ADD_DESIGNATION",
  "ADD_WEBSITE",
  "ADD_START_DATE",
  "ADD_END_DATE",
  "IS_WORKING_CURRENTLY",
  "UPDATE_USER_PROJECT_DETAIL",
  "RESET_EDIT_REDUCER",
  "UPDATE_USER_PHOTO",
  "UPDATE_USER_PHOTO_INDICATOR",
  "UPDATE_USER_PHOTO_SUCCESS",
  "UPDATE_USER_PHOTO_FAILED",
  "UPDATE_USER_ELASTIC"
]);

const {
  UPDATE_USER,
  UPDATE_USER_ELASTIC,
  UPDATE_USER_INDICATOR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_PHOTO,
  UPDATE_USER_PHOTO_INDICATOR,
  UPDATE_USER_PHOTO_SUCCESS,
  UPDATE_USER_PHOTO_FAILED,
  ADD_BIO,
  ADD_GENRE,
  ADD_USERNAME,
  ADD_SUBCATEGORY,
  ADD_MANAGING,
  ADD_MANAGED_BY,
  ADD_IMAGE_FILE_NAME,
  ADD_SKILLS,
  ADD_AGENCY,
  ADD_BUDGET_DETAIL,
  UPDATE_USER_PROJECT_DETAIL,
  RESET_EDIT_REDUCER

} = updateUser;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  bio: "",
  genre: "",
  userName: "",
  subCategoryNames: "",
  managingUserIds: "",
  managedByUserId: "",
  imageFilename: "",
  skills: "",
  agency: "",
  projectBudgetDetails: "",
  isSuccessFullUpdate: false,
  projectDetails: [],
  uploading: false,
  uperror: false,
  uperrorMsg: "",
  responsePhoto: {}
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case UPDATE_USER:
      return { ...state, ...data };
    case UPDATE_USER_ELASTIC:
      return { ...state, ...data };
    case UPDATE_USER_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        isSuccessFullUpdate: false,
        error: false,
      };
    case UPDATE_USER_SUCCESS:
      const response = action.response.data;
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        isSuccessfull: true,
        isSuccessFullUpdate: true
      };

    case UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.message,
        error: true,
        isSuccessFullUpdate: false,
      };
    case UPDATE_USER_PHOTO:
      return { ...state, ...data };

    case UPDATE_USER_PHOTO_INDICATOR:
      return {
        ...state,
        loading: true,
        errorMsg: "",
        error: false,
      };
    case UPDATE_USER_PHOTO_SUCCESS:
      const responsePhoto = action.response.data;
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        responsePhoto: responsePhoto
      };
    case UPDATE_USER_PHOTO_FAILED:
      return {
        loading: false,
        errorMsg: action.message,
        error: true,
      }
    case UPDATE_USER_PROJECT_DETAIL:
      return {
        ...state,
        projectDetails: action.projectDetailData
      };

    case ADD_BIO:
      return {
        ...state,
        bio: action.bio,
      };
    case ADD_GENRE:
      return {
        ...state,
        genre: action.genre,
      };
    case ADD_USERNAME:
      return {
        ...state,
        userName: action.userName,
      };
    case ADD_SUBCATEGORY:
      return {
        ...state,
        subCategoryNames: action.subCategoryNames,
      };
    case ADD_MANAGING:
      return {
        ...state,
        managingUserIds: action.managingUserIds,
      };
    case ADD_MANAGED_BY:
      return {
        ...state,
        managedByUserId: action.managedByUserId,
      };
    case ADD_IMAGE_FILE_NAME:
      return {
        ...state,
        imageFilename: action.imageFilename,
      };
    case ADD_SKILLS:
      return {
        ...state,
        skills: action.skills,
      };
    case ADD_AGENCY:
      return {
        ...state,
        agency: action.agency,
      };
    case ADD_BUDGET_DETAIL:
      return {
        ...state,
        projectBudgetDetails: action.projectBudgetDetails,
      };
    case RESET_EDIT_REDUCER:
      return {
        ...state,
        isSuccessFullUpdate: false,
        error: false,
        errorMsg: ""
      }
    default:
      return state;
  }
}
