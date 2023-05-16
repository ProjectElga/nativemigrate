import mirrorKeyValue from "mirror-key-value";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../constants/StorageKeys";

/* ------------- Types ------------- */

export const SignupTypes = mirrorKeyValue([
  "GOOGLE_SIGNUP",
  "GOOGLE_SIGNUP_INDICATOR",
  "GOOGLE_SIGNUP_SUCCESS",
  "GOOGLE_SIGNUP_FAILED",
  "GOOGLE_SIGNUP_VALIDATION",
  "RESET_REGISTER_STATE",
  "SET_ISLOGGED_IN",
  "RESET_ISLOGGED_IN",
  "RESET_LOGIN_TOKEN",
  "SET_LOGIN_DATA"
]);

const {
  GOOGLE_SIGNUP,
  GOOGLE_SIGNUP_INDICATOR,
  GOOGLE_SIGNUP_SUCCESS,
  GOOGLE_SIGNUP_FAILED,
  GOOGLE_SIGNUP_VALIDATION,
  RESET_REGISTER_STATE,
  SET_ISLOGGED_IN,
  RESET_ISLOGGED_IN,
  RESET_LOGIN_TOKEN,
  SET_LOGIN_DATA
} = SignupTypes;

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  loading: false,
  error: false,
  errorMsg: "",
  signUpData: [],
  isLoggedIn: false,
  loginAccessToken: "",
  userId: "",
  username: "",
};

/* ------------- Reducer ------------- */

export default function reducer(state = INITIAL_STATE, action) {
  const { type, data } = action;
  try {
    switch (type) {
      //RegisterOTPgen
      case GOOGLE_SIGNUP:
        return { ...state, ...data };
      case GOOGLE_SIGNUP_INDICATOR:
        return { ...state, loading: true, errorMsg: "", error: false };
      case GOOGLE_SIGNUP_SUCCESS:
        const response = action.response.data;
        return {
          ...state,
          loading: false,
          isLoggedIn: true,
          loginAccessToken: response?.access_token,
          userId: response?.user?.id,
          signUpData: response,
        };

      case GOOGLE_SIGNUP_FAILED:
        return {
          ...state,
          loading: false,
          errorMsg: action.message,
          error: true,
        };
      case GOOGLE_SIGNUP_VALIDATION:
        return { ...state, loading: false, errorMsg: action.message };
      case SET_ISLOGGED_IN:
        return { ...state, isLoggedIn: true };
      case RESET_ISLOGGED_IN:
        return { ...state, isLoggedIn: false };
      case RESET_LOGIN_TOKEN:
        return { ...state, loginAccessToken: "" };
      //Register
      // case REGISTER_VERIFICATION_SUCCESS:
      //     console.log('Inside reducer register success: ', action.userId, action.token)
      //     AsyncStorage.setItem('isLoggedIn','true');
      //     AsyncStorage.setItem('userId',action.userId);
      //     AsyncStorage.setItem('token',action.token);
      //     return {...state,
      //         userId: action.userId,
      //         loadingOTP:false,
      //         registerOTPview:false,
      //         errorMsgReg: action.errorMsgReg,
      //         errorMsg:'',
      //         isLoggedIn: true,
      //         resentOtp: state.isResend? true: false
      //     };

      case RESET_REGISTER_STATE:
        return INITIAL_STATE;
      case SET_LOGIN_DATA:
        return {
          ...state,
          loginAccessToken: action.token,
          userId: action.userId
        }
      default:
        return state;
    }
  } catch (error) {
    console.warn("error>>", error)
  }

}
