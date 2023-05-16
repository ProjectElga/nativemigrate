import mirrorKeyValue from "mirror-key-value";
/* ------------- Types ------------- */

export const projectActionTypes = mirrorKeyValue([
  "ACCEPT_PROJECT",
  "ACCEPT_PROJECT_INDICATOR",
  "ACCEPT_PROJECT_SUCCESS",
  "ACCEPT_PROJECT_FAILED",
  "RESET_ACCEPT_PROJECT",
  "REJECT_PROJECT_INDICATOR",
  "WITHDRAW_PROJECT",
  "WITHDRAW_PROJECT_INDICATOR",
  "WITHDRAW_PROJECT_SUCCESS",
  "WITHDRAW_PROJECT_FAILED",
  "ADD_MEMBERS",
  "ADD_MEMBERS_INDICATOR",
  "ADD_MEMBERS_SUCCESS",
  "ADD_MEMBERS_FAILED",
  "REMOVE_MEMBERS",
  "REMOVE_MEMBERS_INDICATOR",
  "REMOVE_MEMBERS_SUCCESS",
  "REMOVE_MEMBERS_FAILED",
  "RESET_ADD_MEMBER"
]);

const {
  ACCEPT_PROJECT,
  ACCEPT_PROJECT_INDICATOR,
  ACCEPT_PROJECT_SUCCESS,
  ACCEPT_PROJECT_FAILED,
  WITHDRAW_PROJECT,
  WITHDRAW_PROJECT_INDICATOR,
  WITHDRAW_PROJECT_SUCCESS,
  WITHDRAW_PROJECT_FAILED,
  ADD_MEMBERS,
  ADD_MEMBERS_INDICATOR,
  ADD_MEMBERS_SUCCESS,
  ADD_MEMBERS_FAILED,
  RESET_ACCEPT_PROJECT,
  REMOVE_MEMBERS,
  REMOVE_MEMBERS_INDICATOR,
  REMOVE_MEMBERS_SUCCESS,
  REMOVE_MEMBERS_FAILED,
  RESET_ADD_MEMBER,
  REJECT_PROJECT_INDICATOR,
} = projectActionTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  acceptData: [],
  acceptloading: false,
  rejectloading: false,
  accepterrorMsg: "",
  accepterror: false,
  isAcceptSuccess: false,
  withdrawData: [],
  withdrawloading: false,
  withdrawerrorMsg: "",
  withdrawerror: false,
  isWithdrawSuccess: false,
  removeData: [],
  removeLoading: false,
  removeErrorMsg: "",
  removeError: false,
  isRemoveSuccess: false,
  addData: [],
  addloading: false,
  adderrorMsg: "",
  adderror: false,
  addSuccess: false,
  isAddMember: false

};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  switch (type) {
    case ACCEPT_PROJECT:
      return { ...state, ...data };
    case WITHDRAW_PROJECT:
      return { ...state, ...data };
    case WITHDRAW_PROJECT_INDICATOR:
      return {
        ...state,
        withdrawloading: true,
        withdrawerrorMsg: "",
        withdrawerror: false,
      };
    case WITHDRAW_PROJECT_SUCCESS:
      return {
        ...state,
        withdrawloading: false,
        withdrawerrorMsg: "",
        withdrawerror: false,
        withdrawData: action.response.data,
      };
    case WITHDRAW_PROJECT_FAILED:
      return {
        ...state,
        withdrawloading: false,
        withdrawerrorMsg: action.message,
        withdrawerror: true,
      };
    case ADD_MEMBERS:
      return { ...state, ...data };
    case ADD_MEMBERS_INDICATOR:
      return {
        ...state,
        loading: true,
        adderrorMsg: "",
        adderror: false,
        isAddMember: false
      };
    case ADD_MEMBERS_SUCCESS:
      return {
        ...state,
        addloading: false,
        adderrorMsg: "",
        adderror: false,
        addData: action.response.data,
        isAddMember: true
      };
    case ADD_MEMBERS_FAILED:
      return {
        ...state,
        addloading: false,
        adderrorMsg: action.message,
        adderror: true,
        isAddMember: false
      };
    case RESET_ADD_MEMBER:
      return {
        ...state,
        addloading: false,
        adderrorMsg: "",
        adderror: false,
        isAddMember: false
      };
    case REMOVE_MEMBERS:
      return { ...state, ...data };
    case REMOVE_MEMBERS_INDICATOR:
      return {
        ...state,
        removeLoading: true,
        removeErrorMsg: "",
        removeError: false,
        isRemoveSuccess: false
      };
    case REMOVE_MEMBERS_SUCCESS:
      return {
        ...state,
        removeLoading: false,
        removeErrorMsg: "",
        removeError: false,
        removeData: action.response.data,
        isRemoveSuccess: true
      };
    case REMOVE_MEMBERS_FAILED:
      return {
        ...state,
        removeLoading: false,
        removeErrorMsg: action.message,
        removeError: true,
        isRemoveSuccess: false
      };
    case REJECT_PROJECT_INDICATOR:
      return {
        ...state,
        rejectloading: true,
        accepterrorMsg: "",
        accepterror: false,
        isRemoveSuccess: false
      };
    case ACCEPT_PROJECT_INDICATOR:
      return {
        ...state,
        acceptloading: true,
        accepterrorMsg: "",
        accepterror: false,
      };
    case ACCEPT_PROJECT_SUCCESS:
      return {
        ...state,
        acceptloading: false,
        rejectloading: false,
        accepterror: false,
        acceptData: action.response.data,
        accepterrorMsg: "",
        isAcceptSuccess: true,
      };

    case ACCEPT_PROJECT_FAILED:
      return {
        ...state,
        acceptloading: false,
        accepterrorMsg: action.message,
        accepterror: true,
      };
    case RESET_ACCEPT_PROJECT:
      return INITIAL_STATE;
    default:
      return state;
  }
}
