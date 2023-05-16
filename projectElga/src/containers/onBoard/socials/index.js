import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  Linking,
  Platform,
} from "react-native";
import SocialButton from "../../../components/multicellular/social/SocialButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../../constants/StorageKeys";
import styles from "./Style";
import IMAGES from "../../../themes/Images";
import Footer from "../../../components/multicellular/general/onBoardFooter/Footer";
import { UserMetaTypes } from "../../../reducers/onboard/userMeta";
import { connect, useSelector } from "react-redux";
import STRINGS from "../../../constants/Strings";
import { makePostApiCall, makePostApiCallV2 } from "../../../api";

import { ResponseType } from "expo-auth-session";
import SnackBar from "../../../components/unicellular/snackbar";
import { CredentialsContext } from "../../../utils/credentialsContext";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { discovery } from "expo-auth-session/providers/google";
import * as Facebook from "expo-facebook";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import * as WebBrowser from "expo-web-browser";
import {
  FacebookAuthProvider,
  getAuth,
  signInWithCredential,
} from "firebase/auth";
import { RFValue } from "react-native-responsive-fontsize";
import AuthHeader from "../../../components/multicellular/auth/header";
import COLORS from "../../../themes/colors";
import LoginButton from "../../../components/unicellular/auth/LoginButton";
import SVGS from "../../../constants/SvgUri";
import { LinearGradient } from "expo-linear-gradient";
import URLS from "../../../constants/Urls";
import { profileTypes } from "../../../reducers/profile/profile";
import LINKS from "../../../constants/Links";
WebBrowser.maybeCompleteAuthSession();
import * as Analytics from "expo-firebase-analytics";
import WebView from "react-native-webview";
import SvgUri from "expo-svg-uri";
import { useNavigation } from "@react-navigation/native";

// const redirectUri = AuthSession.makeRedirectUri({
//   useProxy: false,
// });
function Social(props) {
  // const [request, response, promptAsync] = Facebook.useAuthRequest({
  //   responseType: ResponseType.Token,
  //   clientId: "380149733687160",
  //   webClientId: "380149733687160",
  // });
  // const { storedCredentials, setStoredCredentials } =
  //   useContext(CredentialsContext);

  // const [requestGoogle, responseGoogle, promptAsyncGoogle] =
  //   Google.useIdTokenAuthRequest({
  //     // expoClientId:
  //     //   "529591963729-8dbgthc800g8mrr5fdul8uqjavgrf9ad.apps.googleusercontent.com",
  //     clientId:
  //       "529591963729-8dbgthc800g8mrr5fdul8uqjavgrf9ad.apps.googleusercontent.com",
  //     // iosClientId:
  //     //   "529591963729-8dbgthc800g8mrr5fdul8uqjavgrf9ad.apps.googleusercontent.com",
  //     // androidClientId:
  //     //   "529591963729-5u3n1sh48nknsf0m74idmd91slrot10h.apps.googleusercontent.com",
  //   });

  // // Store previous app state to check whether the listener has ever been attached

  // React.useEffect(async () => {
  //   try {
  //     if (responseGoogle?.type === "success") {
  //       const { id_token } = responseGoogle.params;
  //       alert("google data>>>" + JSON.stringify(responseGoogle));
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     // alert(e)
  //   }
  // }, [responseGoogle]);

  // React.useEffect(async () => {
  //   try {
  //     if (response?.type === "success") {
  //       console.log("Facebook", response);
  //       alert("facebook data>>>" + JSON.stringify(response));
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [response]);
  const signup = useSelector((state) => state.signup);
  const { isLoggedIn, error } = signup;
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setuserInfo] = useState(null);
  const [loginLoader, setLoginLoader] = useState(loginLoader);
  const [modalVisible, setModalVisible] = useState(false);
  const [youtubeLinked, setYoutubeLinked] = useState(false);
  const [youtubeName, setYoutubeName] = useState("");
  const [youtubeImage, setYoutubeImage] = useState("");
  const [instagramLinked, setInstagramLinked] = useState();
  const [instagramName, setInstagramName] = useState("");
  const [instagramImage, setInstagramImage] = useState("");
  const [loader, setLoader] = useState();
  const [user, setUser] = useState("");
  const { route = {}, navigation } = props;
  const { params = {} } = route;
  const { type = {}, insta, youtube, instaLinkedSuccess } = params;
  const navigate = useNavigation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    //webClientId:'529591963729-8dbgthc800g8mrr5fdul8uqjavgrf9ad.apps.googleusercontent.com',
    expoClientId:
      "529591963729-8dbgthc800g8mrr5fdul8uqjavgrf9ad.apps.googleusercontent.com",
    androidClientId:
      "529591963729-5u3n1sh48nknsf0m74idmd91slrot10h.apps.googleusercontent.com",
    scopes: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/youtube",
      "https://www.googleapis.com/auth/yt-analytics.readonly",
      "https://www.googleapis.com/auth/youtube.readonly",
    ],
    redirectUri: AuthSession.makeRedirectUri({
      useProxy: true,
      native: Platform.select({
        android:
          "com.googleusercontent.apps.529591963729-5u3n1sh48nknsf0m74idmd91slrot10h:/oauth2redirect",
        default: undefined,
      }),
    }),
  });
  // const redirectUri = AuthSession.makeRedirectUri({
  //   useProxy: true,
  // });
  // const _handlePressButtonAsync = async () => {
  //   let result = await WebBrowser.openBrowserAsync(
  //     `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/youtube&response_type=code&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=${redirectUri}&client_id=529591963729-8dbgthc800g8mrr5fdul8uqjavgrf9ad.apps.googleusercontent.com`
  //   );
  //   // let result = await WebBrowser.openBrowserAsync('https://expo.dev');
  //   // setResult(result);
  //   console.log("result", result);
  //   // alert("tokenn-->", JSON.stringify(result))
  // };
  const apiIntegrationLink = async (accessToken, platform, userId) => {
    setLoader(true);
    let body = {
      userId: userId,
      platform: platform,
      accessToken: accessToken,
    };
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const response = await makePostApiCallV2(
      "/elga-roma/social/link",
      body,
      tokenDetail
    );
    if (response?.status) {
      if (platform === "YOUTUBE") {
        setYoutubeLinked(true);
        // setYoutubeName(response?.data?.accountName);
        // setYoutubeImage(response?.data?.accountImageUrl);
      } else {
        setInstagramLinked(true);
        // setInstagramName(response?.data?.accountName);
        // setInstagramImage(response?.data?.accountImageUrl);
      }
    }
    setLoader(false);
  };

  useEffect(() => {
    setInstagramLinked(insta);
    setYoutubeLinked(youtube);

    effect();
  }, [response, isLoggedIn, error]);
  const effect = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (response?.type == "success") {
      setLoginLoader(true);
      apiIntegrationLink(
        response.authentication.accessToken,
        "YOUTUBE",
        userId
      );

      // let httpUserName = axios.create({
      //   baseURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      // });
      // let param = {
      //   access_token: response.authentication.accessToken,
      // };
      // let headers = { "Content-Type": "application/x-www-form-urlencoded" };

      // let resUserName = await httpUserName
      //   .get(`/`, { params: param, headers: headers })
      //   .catch((error) => {
      //     console.log("resUserName error", error.response);
      //   });
      // if (resUserName?.status === 200) {
      //   const data = resUserName?.data;
      //   const requestParam = {
      //     authProvider: ENUM.GOOGLE_CREATE_AUTH_PROVIDER,
      //     email: data?.email,
      //     fullName: data?.name,
      //   };
      //   const tokenDetail = response.authentication.accessToken;
      //   props.createUser(requestParam, tokenDetail);
      // }
      // if (isLoggedIn) {
      //   setLoginLoader(false);
      // }
      // if (error) {
      //   setLoginLoader(false);
      // }
    }
  };
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
        console.log("user", user);
        setuserInfo(user);
      })
      .catch((err) => {
        console.log("");
        alert("Something went wrong");
      });

    userInfo.json().then(async (data) => {
      console.log("data", data);
      setuserInfo(data);
    });
  };

  const loginWithFacebook = async () => {
    setModalVisible(false);
    const auth = getAuth();
    try {
      await Facebook.initializeAsync({
        appId: "380149733687160",
      });
      console.log("working1");

      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: [
            "public_profile",
            "email",
            "read_insights",
            "pages_show_list",
            "instagram_basic",
            "instagram_manage_insights",
          ],
        });
      console.log("working2");

      if (type === "success") {
        const credential = FacebookAuthProvider.credential(token);

        console.log("Access Token: ", credential.accessToken);

        signInWithCredential(auth, credential)
          .then((user) => {
            // console.log("user from facebook",user)
            console.log("working4");

            console.log("working5");
            setUser(user);
          })
          .catch((error) => {
            console.log("error Firebase", error);
          });
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);

        apiIntegrationLink(credential.accessToken, "INSTAGRAM", userId);
        // fetch(
        //   `https://graph.facebook.com/v14.0/me?fields=id%2Cname%2Cemail&access_token=${credential.accessToken}`,
        //   requestOptions
        // )
        //   .then((response) => response.json())
        //   .then((result) => {
        //     // alert("Login" + JSON.stringify(result));
        //     alert("responseLink" + JSON.stringify(responseLink))
        //     //props.navigation.navigate("Identity");

        //   })
        //   .catch((error) => console.log("error", error));
      }
    } catch (err) {
      console.log("er", err);
    }
  };

  const signInWithFB = async () => {
    // Attempt login with permissions
    setModalVisible(false);

    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
      "read_insights",
      "pages_show_list",
      "instagram_basic",
      "instagram_manage_insights",
    ]);
    if (result.isCancelled) {
      throw "User cancelled the login process";
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw "Something went wrong obtaining access token";
    }

    const auth = getAuth();

    // Create a Firebase credential with the AccessToken
    const facebookAuthProvider = FacebookAuthProvider.credential(
      data.accessToken
    );
    // Sign-in with credential from the Facebook user.
    signInWithCredential(auth, facebookAuthProvider)
      .then(() => {
        setUser(user);
      })
      .catch((error) => {
        // Handle Errors here.]
        console.log(error);
      });
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    apiIntegrationLink(facebookAuthProvider.accessToken, "INSTAGRAM", userId);
  };
  const handleNextClick = async () => {
    await AsyncStorage.setItem(STORAGE_KEY.IS_NEW_USER, "false");
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const displayName = await AsyncStorage.getItem(
      STORAGE_KEY.USER_DISPLAY_NAME
    );

    props.callProfileApi(userId, tokenDetail);
    Analytics.logEvent("onboard_socials", {
      contentType: "socials",
      userId: userId,
      displayName: displayName,
    });
    props.navigation.navigate("Profile", {
      selfView: true,
      userId: await AsyncStorage.getItem(STORAGE_KEY.USER_ID),
      tokenDetail: await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN),
    });
  };
  const handleVideoLink = () => {
    Linking.openURL(LINKS.FACEBOOK_LINKING_URL);
  };
  const renderModal = () => {
    return (
      <Modal transparent={true} animationType="fade" visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: COLORS.monoWhite900,
                  paddingHorizontal: RFValue(24, 844),
                  paddingVertical: RFValue(32, 844),
                  borderRadius: RFValue(16, 844),
                  justifyContent: "center",
                  alignItems: "center",
                  width: RFValue(355, 844),
                }}
              >
                <View
                  style={{
                    width: RFValue(355, 844),
                    height: undefined,
                    aspectRatio: 16 / 9,
                    //justifyContent: "space-between",
                  }}
                >
                  <WebView
                    style={{ borderWidth: 12 }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{
                      uri: `https://www.youtube.com/embed/10UKnFsBvXA`,
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: RFValue(16, 844),
                    color: COLORS.monoBlack700,
                    marginTop: RFValue(32, 844),
                  }}
                >
                  Instructions to link Instagram
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: RFValue(14, 844),
                    color: COLORS.monoBlack500,
                    marginTop: RFValue(12, 844),
                    textAlign: "center",
                  }}
                >
                  To Link, Your Instagram account needs to be linked with your
                  Facebook Page. Check the above video to learn more.
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: RFValue(14, 844),
                    color: COLORS.monoBlack500,
                    marginTop: RFValue(8, 844),
                    lineHeight: RFValue(20, 844),
                    textAlign: "center",
                  }}
                >
                  <Text style={styles.textLink}>Click on Continue Linking</Text>
                  , if your Instagram is already linked with your Facebook page
                </Text>
                <TouchableOpacity
                  style={{ width: "100%", marginTop: RFValue(16, 844) }}
                >
                  <LinearGradient
                    style={{ borderRadius: RFValue(200, 844) }}
                    colors={[
                      "#FEDA77",
                      "#F58529",
                      "#DD2A7B",
                      "#8134AF",
                      "#515BD4",
                    ]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <View
                      style={{
                        borderRadius: RFValue(200, 844),
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: RFValue(16, 844),
                        flexDirection: "row",
                      }}
                    >
                      <SvgUri svgXmlData={SVGS.WHITE_INSTA} />
                      <Text
                        style={{
                          fontFamily: "Poppins_600SemiBold",
                          fontSize: RFValue(14, 844),
                          color: COLORS.monoWhite900,
                          marginLeft: 8,
                        }}
                      >
                        Continue Linking
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  const _renderInstagramButton = () => {
    return instaLinkedSuccess ? (
      <SocialButton
        inactive={true}
        borderWidth={1}
        gradient={["#FEDA77", "#F58529", "#DD2A7B", "#8134AF", "#515BD4"]}
        image={IMAGES.InstagramColored}
        // onPress={() => {
        //   setModalVisible(true);
        // }}
        text={"Instagram Linked"}
      />
    ) : instagramLinked ? (
      <SocialButton
        inactive={true}
        borderWidth={1}
        gradient={["#FEDA77", "#F58529", "#DD2A7B", "#8134AF", "#515BD4"]}
        image={IMAGES.InstagramColored}
        // onPress={() => {
        //   setModalVisible(true);
        // }}
        text={"Instagram Linked"}
      />
    ) : (
      <SocialButton
        inactive={false}
        borderWidth={1}
        gradient={["#FEDA77", "#F58529", "#DD2A7B", "#8134AF", "#515BD4"]}
        image={IMAGES.InstagramColored}
        onPress={() => {
          // setModalVisible(true);
          navigate.navigate("InstagramLink");
        }}
        text={"Link Your Instagram"}
      />
    );
  };
  const _renderYoutubeButton = () => {
    return youtubeLinked ? (
      <SocialButton
        inactive={true}
        borderWidth={1}
        width={RFValue(30, 844)}
        gradient={["#FF2221", "#E70100"]}
        height={RFValue(30, 844)}
        image={IMAGES.YoutubeRed}
        text={"Youtube Linked"}
      />
    ) : (
      <SocialButton
        borderWidth={1}
        inactive={false}
        width={RFValue(30, 844)}
        gradient={["#FF2221", "#E70100"]}
        height={RFValue(30, 844)}
        image={IMAGES.YoutubeRed}
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
        text="Link Your Youtube"
      />
    );
  };
  const _renderSpotify = () => {
    return (
      <SocialButton
        inactive={true}
        borderWidth={1}
        width={RFValue(30, 844)}
        gradient={["#FF2221", "#E70100"]}
        height={RFValue(30, 844)}
        image={IMAGES.SpotifyLogo}
        text="Coming Soon"
      />
    );
  };
  const _renderLinkedIn = () => {
    return (
      <SocialButton
        inactive={true}
        borderWidth={1}
        width={RFValue(30, 844)}
        gradient={["#FF2221", "#E70100"]}
        height={RFValue(30, 844)}
        image={IMAGES.LinkedInLogo}
        text="Coming Soon"
      />
    );
  };
  const _renderTwitter = () => {
    return (
      <SocialButton
        inactive={true}
        borderWidth={1}
        width={RFValue(30, 844)}
        gradient={["#FF2221", "#E70100"]}
        height={RFValue(30, 844)}
        image={IMAGES.TwitterLogo}
        text="Coming Soon"
      />
    );
  };
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
            // loginWithFacebook();
            signInWithFB();
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

  const renderLoader = () => (
    <View style={styles.loaderPage}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      {renderModal()}
      <View style={styles.topContainer}>
        <AuthHeader
          title="Platforms"
          subtitle="Link Your Socials"
          description="Build your Media kit, Get discovered"
          rightComp={() => {
            return (
              <View>
                {type === "link" ? (
                  <TouchableWithoutFeedback onPress={handleNextClick}>
                    <View style={styles.saveButton}>
                      <Text style={styles.saveText}>Save</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <TouchableWithoutFeedback onPress={handleNextClick}>
                    <Text
                      style={{
                        fontFamily: "Poppins_500Medium",
                        fontSize: RFValue(16, 844),
                        color: COLORS.monoBlack900,
                      }}
                    >
                      Skip
                    </Text>
                  </TouchableWithoutFeedback>
                )}
              </View>
            );
          }}
        />

        {_renderYoutubeButton()}
        {_renderInstagramButton()}
        {_renderLinkedIn()}
        {_renderSpotify()}
        {_renderTwitter()}
      </View>
      {/* {error && (
        <SnackBar
          visible={error}
          onDismiss={() => {
            setError(false);
          }}
          text={STRINGS.USER_NAME_INVALID}
        />
      )} */}
      {loader && renderLoader()}
      <Footer
        onBackPress={() => {
          props.navigation.goBack(null);
        }}
        onNextPress={handleNextClick}
        hideNext={type == "link" ? true : false}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  const { userMeta, signup, profile, instagram, youtube } = state;
  return { userMeta, signup, profile, instagram, youtube };
};

const mapDispatchToProps = (dispatch) => ({
  callUserMetaApi: (userId, tokenDetail) => {
    dispatch({
      type: UserMetaTypes.FETCH_USER_META,
      userId,
      tokenDetail,
    });
  },
  callProfileApi: (userId, tokenDetail, entityId) => {
    dispatch({
      type: profileTypes.GET_PROFILE_DATA,
      userId,
      tokenDetail,
      entityId,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Social);
