import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../constants/StorageKeys";
import { connect, useSelector } from "react-redux";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import AuthHeader from "../../components/multicellular/auth/header";
import NextButton from "../../components/multicellular/general/nextButton";
import COLORS from "../../themes/colors";
import IMAGES from "../../themes/Images";
import OtpInputs from "react-native-otp-inputs";
import { auth, firebaseConfig } from "../../config/firebaseConfig";
import {
  FirebaseRecaptchaBanner,
  FirebaseRecaptchaVerifierModal,
} from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { SignupTypes } from "../../reducers/auth/signup";
import { withNavigation } from "react-navigation";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import PushNotification from "../../components/multicellular/notification";
import SnackBar from "../../components/unicellular/snackbar";
import Verify from "../../constants/Verify";
import * as Analytics from "expo-firebase-analytics";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
function OtpScreen(props) {
  const { route, navigation } = props;
  const { phoneNumber } = route.params;

  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [timer, setTimer] = useState(30);
  const recaptchaVerifier = useRef(null);
  const [otpError, setOtpError] = useState(false);
  const [otpErrorMsg, setOtpErrorMsg] = useState("");
  const signup = useSelector((state) => {
    return state.signup;
  });
  const attemptInvisibleVerification = false;
  const { isLoggedIn, loading, error, errorMsg, signUpData } = signup;
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const sendVerification = async () => {
    setTimer(30);
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
    } catch (err) {
      console.log("Verification code", err);
    }
  };
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        //alert("Failed to get push token for push notification!");
        token = "";
      } else {
        token = (await Notifications.getExpoPushTokenAsync()).data;
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    effect();
  }, [isLoggedIn, signUpData, otpError]);

  const effect = async () => {
    let { verificationId } = route.params;
    setVerificationId(verificationId);

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    if (isLoggedIn) {
      await AsyncStorage.setItem(STORAGE_KEY.USER_ID, signUpData?.user?.id);
      await AsyncStorage.setItem(
        STORAGE_KEY.ACCESS_TOKEN,
        signUpData?.access_token
      );
      await AsyncStorage.setItem(
        STORAGE_KEY.REFRESH_TOKEN,
        signUpData?.refresh_token
      );
      await AsyncStorage.setItem(
        STORAGE_KEY.IS_NEW_USER,
        signUpData?.user?.newUser ? "true" : "false"
      );
      console.log("signUpData", signUpData);
      Analytics.logEvent("onboard_otp", {
        contentType: "otp",
        userId: signUpData?.user?.id,
        //displayName: signUpData?.user?.displayName,
      });
      if (signUpData?.user?.newUser) {
        props.navigation.navigate("BasicDetailsName");
      } else {
        props.navigation.navigate("Explore");
      }
    }
    if (otpError) {
      setTimeout(function () {
        setOtpError(false);
        setOtpErrorMsg("");
      }, 3000);
    }
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  };
  const handleOtpVerification = async () => {
    try {
      let temp = expoPushToken.replace("[", "%5B");
      let final_token = temp.replace("]", "%5D");
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential);
      const phone = phoneNumber?.substring(3, 14);
      const requestParam = {
        phone: phone,
        countryCode: "91",
        password: phone,
        expoToken: final_token,
        uid: auth.currentUser.uid,
      };
      props.createUser(requestParam, "");
      PushNotification(
        expoPushToken,
        "Welcome to Shaer!",
        "Your Digital Workspace"
      );
    } catch (err) {
      setOtpError(true);
      setOtpErrorMsg(Verify.VERIFY_OTP);
    }
  };

  if (timer > 0) {
    setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
  }

  const onClickClose = () => {
    props.navigation.navigate("LoginScreen");
  };
  return (
    <View style={Styles.wrapper}>
      <View>
        <AuthHeader
          title="Phone Verification"
          subtitle="Enter OTP"
          rightComp={() => {
            return (
              <TouchableOpacity onPress={onClickClose}>
                <View style={Styles.cross}>
                  <Icon
                    type="feather"
                    name="x"
                    size={12}
                    color={COLORS.monoBlack900}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {/* <View style={Styles.otpWrapper}> */}
        <OtpInputs
          handleChange={setVerificationCode}
          numberOfInputs={6}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: RFValue(12, 844),
          }}
          inputStyles={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: COLORS.monoGhost500,
            borderRadius: RFValue(12, 844),
            width: RFValue(48, 844),
            height: RFValue(48, 844),
            fontFamily: "Poppins_400Regular",
            fontSize: RFValue(20, 844),
            color: COLORS.monoBlack900,
          }}
        />
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: RFValue(14, 844),
            color: COLORS.monoBlack900,
            marginTop: RFValue(28, 844),
            alignSelf: "center",
          }}
        >
          OTP sent to {phoneNumber}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            backgroundColor: COLORS.monoWhite900,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: RFValue(14, 844),
              color: COLORS.monoBlack900,
              marginTop: RFValue(24, 844),
            }}
          >
            Resend OTP in {timer} Secs,{" "}
          </Text>

          <TouchableOpacity
            disabled={timer == 0 ? false : true}
            onPress={sendVerification}
          >
            <View>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: RFValue(14, 844),
                  color: COLORS.primaryTeal400,
                  marginTop: RFValue(24, 844),
                  opacity: timer == 0 ? 1 : 0.5,
                }}
              >
                Resend OTP
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        // onVerify={(token) => setRecaptchaToken(token)}
        firebaseConfig={firebaseConfig}
        //attemptInvisibleVerification
      />
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      <NextButton
        disabled={verificationCode.length < 6 ? true : false}
        opacity={verificationCode.length < 6 ? 0.7 : 1}
        onPress={handleOtpVerification}
        loading={loading}
      />
      {otpError && (
        <SnackBar
          visible={otpError}
          text={otpErrorMsg}
          onDismiss={() => {
            setOtpError(false);
            setOtpErrorMsg("");
          }}
        />
      )}
      {error && (
        <SnackBar
          visible={error}
          text={errorMsg}
          // onDismiss={() => {
          //   props?.resetUserSignIn()
          // }}
        />
      )}
    </View>
  );
}
const mapStateToProps = (state) => {
  const { signup } = state;
  return { signup };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (requestParam, tokenDetail) => {
      dispatch({
        type: SignupTypes.GOOGLE_SIGNUP,
        requestParam,
        tokenDetail,
      });
    },
    resetUserSignIn: () => {
      dispatch({ type: SignupTypes.RESET_REGISTER_STATE });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OtpScreen);
const Styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.monoWhite900,
    width: "100%",
    height: "100%",
    paddingHorizontal: RFValue(20, 844),
    paddingTop: RFValue(64, 844),
    paddingBottom: RFValue(24, 844),
    justifyContent: "space-between",
  },
  cross: {
    width: RFValue(40, 844),
    height: RFValue(40, 844),
    borderWidth: 1,
    borderRadius: RFValue(20, 844),
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.monoChromeBlack,
  },
  otpWrapper: {
    width: "100%",
    justifyContent: "space-between",
    borderWidth: 2,
  },
});
