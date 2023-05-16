import React, { useState, useEffect, useContext } from "react";
import * as Application from 'expo-application';
import {
  ImageBackground,
  View,
  Image,
  ActivityIndicator,
  NetInfo,
  Dimensions,
  Text,
  AppState,
} from "react-native";
//import * as Facebook from "expo-facebook";
// import * as WebBrowser from 'expo-web-browser';
import { withNavigation } from "react-navigation";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { discovery } from "expo-auth-session/providers/google";
import * as Facebook from "expo-facebook";
import * as WebBrowser from "expo-web-browser";
import {
  FacebookAuthProvider,
  getAuth,
  signInWithCredential,
} from "firebase/auth";
import { connect, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../config/firebaseConfig";
// import firebase from "firebase";
import LoginButton from "../../components/unicellular/auth/LoginButton";
import AuthHeader from "../../components/multicellular/auth/header";
import Identity from "../onBoard/identity";
import { BackgroundImages, SubTitle, Title } from "../../config/AuthPageInfo";
import GoogleConifg from "../../config/GoogleConfig.js";
import COLORS from "../../themes/colors";
import IMAGES from "../../themes/Images";
import STORAGE_KEY from "../../constants/StorageKeys";
import { SignupTypes } from "../../reducers/auth/signup";
import styles from "./Style";
import OBJECT from "../../constants/Object";
import InstagramLoginBtn from "./InstagramLogin";
import ENUM from "../../constants/Enum";
import SvgUri from "expo-svg-uri";
import SVGS from "../../constants/SvgUri";
import { RFValue } from "react-native-responsive-fontsize";
import SelfViewProfile from "../profile/createrProfile/SelfViewProfile";
import STRINGS from "../../constants/Strings";
import CreaterProfile from "../profile/createrProfile";
import ChatTest from "../chat/ChatTest";
import { ResponseType } from "expo-auth-session";

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { CredentialsContext } from "../../utils/credentialsContext";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({
  useProxy: false,
});

function Auth(props) {
  const [seconds, setSeconds] = useState(0);

  const signup = useSelector((state) => state.signup);
  const {isLoggedIn,error} = signup;
  const img = BackgroundImages[seconds % 3];

  const [accessToken, setAccessToken] = useState();
  const [userInfo, setuserInfo] = useState(null);
  const [loginLoader, setLoginLoader] = useState(loginLoader)
  // const [error, setError] = useState("");
  const [user, setUser] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    //webClientId:'529591963729-8dbgthc800g8mrr5fdul8uqjavgrf9ad.apps.googleusercontent.com',
    expoClientId:
      "529591963729-8dbgthc800g8mrr5fdul8uqjavgrf9ad.apps.googleusercontent.com",
    androidClientId:
      "529591963729-5u3n1sh48nknsf0m74idmd91slrot10h.apps.googleusercontent.com",
    // scopes: ["profile", "email",],
    scopes: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/youtube",
      'https://www.googleapis.com/auth/yt-analytics.readonly',
      'https://www.googleapis.com/auth/youtube.readonly'
    ],
    redirectUri: AuthSession.makeRedirectUri({
      useProxy: true,
    }),
  });
  const redirectUri= AuthSession.makeRedirectUri({
    useProxy: true,
  });
  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(`https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/youtube&response_type=code&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=${redirectUri}&client_id=529591963729-8dbgthc800g8mrr5fdul8uqjavgrf9ad.apps.googleusercontent.com`);
    // let result = await WebBrowser.openBrowserAsync('https://expo.dev');
    // setResult(result);
    // alert("tokenn-->", JSON.stringify(result))
  };
  useEffect( () => {
  effect()
  }, [response,isLoggedIn,error]);
  const effect= async()=>{
    if (response?.type == "success") {
      setLoginLoader(true);
      let httpUserName = axios.create({
        baseURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      });
      let param = {
        access_token:  response.authentication.accessToken,
      };
      let headers = { "Content-Type": "application/x-www-form-urlencoded" };
  
      let resUserName = await httpUserName
        .get(`/`, { params: param, headers: headers })
        .catch((error) => {
          console.log("resUserName error",error.response);
        });
        if (resUserName?.status === 200) {
          const data = resUserName?.data
          const requestParam = {
            authProvider: ENUM.GOOGLE_CREATE_AUTH_PROVIDER,
            email: data?.email,
            fullName: data?.name
          }
          const tokenDetail = response.authentication.accessToken;
          props.createUser(requestParam, tokenDetail);   
               
        }
        if(isLoggedIn){
          setLoginLoader(false);
        }
        if(error){
          setLoginLoader(false);
        }  
    }
    
  }
  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
      .then(async (user) => {
        return user.json();
      })
      .then((user) => {
        setuserInfo(user);
      })
      .catch((err) => {
        alert("Something went wrong");
      });

    userInfo.json().then(async (data) => {
      setuserInfo(data);
    });
  };

  const loginWithFacebook = async () => {
    const auth = getAuth();
    try {
      await Facebook.initializeAsync({
        appId: "380149733687160",
      });

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email","read_insights",
        "pages_show_list",
        "instagram_basic",
        "instagram_manage_insights"],
      });

      if (type === "success") {
        const credential = FacebookAuthProvider.credential(token);
        signInWithCredential(auth, credential)
          .then((user) => {
            setUser(user);
          })
          .catch((error) => {
            console.log("error Firebase", error);
          });
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        fetch(
          `https://graph.facebook.com/v14.0/me?fields=id%2Cname%2Cemail&access_token=${credential.accessToken}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            props.navigation.navigate("Identity");
            alert("login Successful ");
            persistLogin(credential)
          })
          .catch((error) => console.log("error", error));
        // Sign in with credential from the Facebook user.
      }
    } catch (err) {
      console.log("er", err);
    }
  };
  const persistLogin = (credentials) => {
    AsyncStorage.setItem("ElgaRomaCredentials", JSON.stringify(credentials))
      .then(() => {
        setStoredCredentials(credentials);
      })
      .catch((e) => {
        console.log("Persist login failed", e);
      });
  };
  const _renderHeaderText = () => {
    return (
      <View
        style={{
          justifyContent: "flex-start",
          marginBottom: RFValue(32, 844),
          marginLeft: RFValue(24, 844),
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: RFValue(28, 844),
            color: COLORS.monoBlack700,
            lineHeight: RFValue(38, 844),
          }}
        >
          The Digital
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_700Bold",
            fontSize: RFValue(48, 844),
            color: COLORS.monoBlack700,

            lineHeight: RFValue(70, 844),
          }}
        >
          Work Space
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: RFValue(28, 844),
              color: COLORS.monoBlack700,
              lineHeight: RFValue(38, 844),
            }}
          >
            for
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: RFValue(28, 844),
              color: COLORS.primaryTeal400,
              marginLeft: 8,
              lineHeight: RFValue(38, 844),
            }}
          >
            Creator Economy
          </Text>
        </View>
      </View>
    );
  };

  const signInAsync = async () => {
    // props.enableLoading();
    // try {
    //   await GoogleSignIn.askForPlayServicesAsync();
    //   const { type, user } = await GoogleSignIn.signInAsync();
    //   if (type === "success") {
    //     let usr = await GoogleSignIn.getCurrentUserAsync();
    //     props.createUser(
    //       user,
    //       user.accessToken,
    //       ENUM.INSTAGRAM_CREATE_AUTH_PROVIDER
    //     );
    //     AsyncStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, user.accessToken);
    //   }
    // } catch ({ message }) {
    //   alert("login: Error:" + message);
    //   props.disableLoading();
    // }
    props.navigation.navigate("Identity");
    // checkUserSession()
  };
  const createUserInstagram = (data) => {
    const instaToken = `Bearer ${data.access_token}`;
    AsyncStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, JSON.stringify(instaToken));
    props.createUser(data, instaToken, ENUM.INSTAGRAM_CREATE_AUTH_PROVIDER);
  };
  //https://firebase.google.com/docs/auth/?authuser=1&hl=en
  const _renderLoginButtons = () => {
    return (
      <View
        style={{
          width: "100%",
          paddingHorizontal: RFValue(25, 844),
          alignItems: "center",
          marginTop: RFValue(24, 844),
        }}
      >
        <LoginButton
          backgroundColor="#ffffff"
          text="Continue with Facebook"
          textColor="#8794A2"
          icon={SVGS.FACEBOOK}
          onPress={() => {
            loginWithFacebook();
          }}
          // loading={loading}
        />
        {/* <InstagramLoginBtn onLoginSuccess={createUserInstagram} /> */}
        <LoginButton
          marginTop={RFValue(32, 844)}
          backgroundColor="#ffffff"
          text="Continue with Google"
          textColor="#8794A2"
          icon={SVGS.GOOGLE}
          onPress={
            accessToken
              ? getUserData
              : () => {
                  promptAsync(discovery, {
                    useProxy: false,
                    showInRecents: true,
                  });
                }
            // _handlePressButtonAsync
          }
          // loading={loading}
        />
      </View>
    );
  };
  // const googleSignInFirebase = () => {
  //   var provider = new firebase.auth.GoogleAuthProvider();
  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       /** @type {firebase.auth.OAuthCredential} */
  //       var credential = result.credential;

  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       var token = credential.accessToken;
  //       // The signed-in user info.
  //       var user = result.user;
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       // The email of the user's account used.
  //       var email = error.email;
  //       // The firebase.auth.AuthCredential type that was used.
  //       var credential = error.credential;
  //       // ...
  //     });
  // };
  const _renderLogo = () => {
    return (
      <View
        style={{
          width: "100%",
          height: "30%",

          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <TouchableWithoutFeedback onPress={signInAsync}>
          <SvgUri
            svgXmlData={SVGS.LOGO}
            style={styles.logo}
            height={RFValue(27, 844)}
            width={RFValue(147, 844)}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  };
  const _renderIcons = () => {
    return (
      <View style={styles.iconWrapper}>
        <View style={styles.icon1}>
          <SvgUri
            svgXmlData={SVGS.WHITE_USER_PLUS}
            width={RFValue(32, 844)}
            height={RFValue(32, 844)}
          />
        </View>
        <View style={styles.iconSubWrapper}>
          <View style={styles.icon2}>
            <SvgUri
              svgXmlData={SVGS.MESSAGE_ICON}
              width={RFValue(32, 844)}
              height={RFValue(32, 844)}
              style={{ transform: [{ rotate: "45deg" }] }}
            />
          </View>
          <View style={styles.icon3}>
            <SvgUri
              svgXmlData={SVGS.WHITE_BRIEFCASE}
              width={RFValue(32, 844)}
              style={{ transform: [{ rotate: "-30deg" }] }}
              height={RFValue(32, 844)}
            />
          </View>
        </View>

        <View style={styles.icon4}>
          <SvgUri
            svgXmlData={SVGS.WHITE_SEARCH}
            width={RFValue(36, 844)}
            height={RFValue(36, 844)}
            style={{ transform: [{ rotate: "0deg" }] }}
          />
        </View>
      </View>
    );
  };
   if (STRINGS.USER_ID !== "") {
     return <SelfViewProfile selfView={true} />;
   }
  // if (loginAccessToken !== null && loginAccessToken !== "") {
  //   return <Identity />;
  // } else {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) =>
        storedCredentials ? (
          <SelfViewProfile selfView={true} />
        ) : (
          <ImageBackground
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: COLORS.monoWhite900,
            }}
            source={IMAGES.onboarding}
            imageStyle={{
              width: "100%",
              height: "100%",
              resizeMode: "stretch",
            }}
          >
            <View style={styles.authWrapper}>
              {loginLoader ? 
              <View style={styles.loaderWindow}>
                <Text style={styles.loaderText}> Loading ...</Text>
              </View> : null}
              <View style={styles.wrapper}>
                {_renderHeaderText()}

                {_renderIcons()}

                <View style={styles.bottomContainer}>
                  {_renderLoginButtons()}
                  {_renderLogo()}
                </View>
              </View>
            </View>
          </ImageBackground>
        )
      }
    </CredentialsContext.Consumer>
  );
}
//}
const mapStateToProps = (state) => {
  const { signup } = state;
  return signup;
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
    setUserLoginData: (userId, token) => {
      dispatch({ type: SignupTypes.SET_LOGIN_DATA, userId, token });
    },
    enableLoading: () => {
      dispatch({ type: SignupTypes.GOOGLE_SIGNUP_INDICATOR });
    },
    disableLoading: () => {
      dispatch({ type: SignupTypes.RESET_REGISTER_STATE });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Auth));
