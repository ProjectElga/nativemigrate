import React, { useEffect, useRef, useState } from "react";

import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import NextButton from "../../components/multicellular/general/nextButton";
import COLORS from "../../themes/colors";
import IMAGES from "../../themes/Images";
import {
  FirebaseRecaptchaBanner,
  FirebaseRecaptchaVerifier,
  FirebaseRecaptchaVerifierModal,
} from "expo-firebase-recaptcha";
import { auth, firebaseConfig } from "../../config/firebaseConfig";
import { PhoneAuthProvider, getAuth, RecaptchaVerifier } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../constants/StorageKeys";
import navigationService from "../../utils/NavigationClass";
import { connect } from "react-redux";
import { SignupTypes } from "../../reducers/auth/signup";
import * as WebBrowser from "expo-web-browser";
import SvgUri from "expo-svg-uri";
import SVGS from "../../constants/SvgUri";
const width = Dimensions.get("window").width;

function NumberScreen(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const attemptInvisibleVerification = true;
  const [loader, setLoader] = useState(false);
  const { navigation } = props;
  useEffect(() => {
    props.resetLoggedIn();
  }, [navigation]);
  const sendVerification = async () => {
    setLoader(true);
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verification = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verification);
      setLoader(false);
      props?.navigation.navigate("OtpScreen", {
        verificationId: verification,
        phoneNumber: phoneNumber,
      });
    } catch (err) {
      console.log("Verification code", err);
    }
  };

  return (
    <View style={Styles.wrapper}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        // onVerify={(token) => setRecaptchaToken(token)}
        androidHardwareAccelerationDisabled={true}
        androidLayerType="software"
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification
      />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={-RFValue(264, 844)}
      >
        <View style={Styles.imageWrapper}>
          <Image source={IMAGES.numberBg} style={Styles.image} />
          <View style={Styles.overlayView}>
            <Image
              source={IMAGES.shareText}
              style={Styles.shaerLogo}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={Styles.bottomWrapper}>
          <View style={Styles.bottomCard}>
            <View style={{ marginBottom: RFValue(8, 844) }}>
              <Text style={Styles.headingText}>Collect, Share &</Text>
              <Text style={[Styles.headingText, { marginTop: 8 }]}>
                Collaborate over
                <Text style={{ color: COLORS.primaryTeal400 }}> Ideas</Text>
              </Text>
            </View>
            <View style={Styles.numberWrapper}>
              <View
                style={[
                  Styles.inputBox,
                  {
                    width: "20%",
                  },
                ]}
              >
                <Text style={Styles.number}>+91</Text>
              </View>
              <View
                style={[
                  Styles.inputBox,
                  {
                    width: "75%",
                  },
                ]}
              >
                <TextInput
                  keyboardType="number-pad"
                  maxLength={10}
                  textAlign="center"
                  placeholder="Enter Your Number"
                  style={[Styles.number, Styles.input]}
                  onChangeText={(text) => {
                    setPhoneNumber("+91" + text);
                  }}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: RFValue(24, 844),

                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={Styles.TandCText}>
                By Continuing you agree to our{" "}
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  await WebBrowser.openBrowserAsync(
                    "https://www.elgaroma.com/terms-of-service"
                  );
                }}
              >
                <Text
                  style={[Styles.TandCText, { color: COLORS.primaryTeal500 }]}
                >
                  Terms of Service
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: RFValue(20, 844),
                marginBottom: RFValue(40, 844),
              }}
            >
              <NextButton
                disabled={phoneNumber.length < 13 ? true : false}
                opacity={phoneNumber.length < 13 ? 0.7 : 1}
                title="Get Started"
                loading={loader}
                onPress={() => {
                  sendVerification();
                }}
              />
            </View>
          </View>
        </View>
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      </KeyboardAvoidingView>
    </View>
  );
}
const mapStateToProps = (state) => {
  const { identity } = state;
  return identity;
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetLoggedIn: () => {
      dispatch({ type: SignupTypes.RESET_ISLOGGED_IN });
    },
  };
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withNavigation(Identity));

export default connect(mapStateToProps, mapDispatchToProps)(NumberScreen);
const Styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.monoWhite900,
    height: "100%",
  },

  elgaromaText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(24, 844),
    color: COLORS.monoBlack900,
    lineHeight: RFValue(30, 844),
  },
  headingText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(30, 844),
    color: COLORS.monoBlack900,
    marginTop: 12,
    lineHeight: RFValue(32, 844),
  },
  numberWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: RFValue(24, 844),
  },
  inputBox: {
    height: RFValue(64, 844),
    backgroundColor: COLORS.monoGhost500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(16, 844),
  },
  number: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack900,
  },
  input: {
    width: "100%",
    paddingHorizontal: RFValue(24, 844),
  },
  TandCText: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack900,
    //alignSelf: "center",
  },
  button: {
    width: "100%",
    height: RFValue(56, 844),
    backgroundColor: COLORS.monoBlack900,
    borderRadius: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(16, 844),
    color: COLORS.monoWhite900,
  },
  imageWrapper: {
    position: "absolute",
    width: "100%",
    height: undefined,
    aspectRatio: 3 / 4,
  },
  overlayView: {
    width: "100%",
    backgroundColor: "#00000077",
    height: "100%",
    position: "absolute",
    justifyContent: "flex-end",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: RFValue(50, 844),
  },
  shaerLogo: { width: "50%", height: RFValue(110, 844) },
  image: { width: "100%", height: "100%" },
  bottomWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    //backgroundColor: COLORS.monoWhite900,
  },
  bottomCard: {
    backgroundColor: COLORS.monoWhite900,
    paddingHorizontal: RFValue(20, 844),
    paddingVertical: RFValue(20, 844),
  },
});
