import React, { useEffect, useState, useRef } from "react";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import NetInfo from "@react-native-community/netinfo";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as Sentry from "sentry-expo";
import {
  View,
  Text,
  LogBox,
  Platform,
  Image,
  SafeAreaView,
  ImageBackground,
  AppState,
} from "react-native";
import * as Linking from 'expo-linking';

import { Provider } from "react-redux";
import OtpScreen from "./src/containers/auth/otp";
import LoginScreen from "./src/containers/auth/numberScreen";
import Discover from "./src/containers/Discover";
import store from "./src/store";
import {
  createNavigationContainerRef,
  NavigationContainer,
  useRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Identity from "./src/containers/onBoard/identity";
import UserCategory from "./src/containers/onBoard/userCategory";
// import More from "./src/containers/onBoard/more";
import RewardPage from "./src/containers/rewardPage";
import Socials from "./src/containers/onBoard/socials/index";
import CreatorProfile from "./src/containers/profile/createrProfile";
import BrandSelfView from "./src/containers/profile/brandProfile/BrandSelfView";
import BrandProfile from "./src/containers/profile/brandProfile/index";
import SelfViewProfile from "./src/containers/profile/createrProfile/SelfViewProfile";
import AddParticipants from "./src/containers/profile/actionButtonPages/addParticipants";
import PendingPage from "./src/containers/projects/pendingPage";
import CollabPage from "./src/containers/profile/actionButtonPages/collabPage";
import Setting from "./src/containers/profile/setting";
// import EditPage from "./src/containers/profile/editPage";
// import OppurtunityPage from "./src/containers/profile/actionButtonPages/oppurtunityPage";
// import collabPage from "./src/containers/profile/actionButtonPages/collabPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "./src/constants/StorageKeys";
import SuccessPage from "./src/containers/projects/successPage/success";
import UserGenre from "./src/containers/onBoard/userGenre";
import AccountSettings from "./src/containers/profile/setting/accountSetting";
import NotifcationSetting from "./src/containers/profile/setting/notificationSetting";
import FilterPage from "./src/containers/Discover/filter";
import Collaborates from "./src/containers/profile/collaboratorsPage";
import NotificationPage from "./src/containers/notifications";
import Projects from "./src/containers/projects";
import Opportunity from "./src/containers/opportunity/index";
import Saved from "./src/containers/profile/saved";
import EditPage from "./src/containers/profile/editPage";
import EditTags from "./src/containers/profile/editTags";
import EditCategory from "./src/containers/profile/editCategory";
import Search from "./src/containers/search";
import SearchDetail from "./src/containers/search/SearchDetail";
import More from "./src/containers/onBoard/more";
import BasicDetailsName from "./src/containers/onBoard/basicDetailsName";
import SplashScreen from "./src/containers/auth/SplashScreen";
import Chat from "./src/containers/chat/index";
import ChatRoom from "./src/containers/chat/ChatRoom";
import CircleInfo from "./src/containers/chat/circleContactInfo";
import ProjectInfo from "./src/containers/chat/projectContactInfo";
import AddMember from "./src/containers/profile/actionButtonPages/addMemberToChat";
import ImagePreview from "./src/containers/chat/imagePreview";
import EditCompany from "./src/containers/profile/editCompany";
import ComingSoonPage from "./src/containers/profile/comingSoonPage";
import IMAGES from "./src/themes/Images";
import RewardButton from "./src/components/multicellular/general/rewardButton";
import { routesToShowReward } from "./src/config/config";
import FolioDetail from "./src/containers/profile/folioDetail";
import InternetBottomSheet from "./src/components/multicellular/general/bottomNavBar/InternetBottomSheet";
import * as Analytics from "expo-firebase-analytics";
import { makePutApiCall } from "./src/api";
import { StatusBar } from "expo-status-bar";
import Circle from "./src/containers/circle";
import ProfileProgress from "./src/containers/profile/profileProgressPage";
import FolioPage from "./src/containers/profile/actionButtonPages/folioPage";
import LinkPreview from "./src/containers/profile/actionButtonPages/linkPreview";
import Explore from "./src/containers/explore";
import Moodboard from "./src/containers/moodboard";
import ChatMoodboard from "./src/containers/chat/ChatMoodboard";
import InstagramLink from "./src/containers/onBoard/instagramLink";
import CreatorChallenges from "./src/containers/explore/creatorChallenges";
import FeedDetails from "./src/containers/explore/feedDetail";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();
// async function readInternetConnection() {
//   NetInfo.fetch().then((state) => {
//     return state.isConnected;
//   });
// }
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
Sentry.init({
  dsn: "https://c1cd6cd96df04cd787d5a2beb3fc8f71@o1422945.ingest.sentry.io/4504367289597952",
  enableInExpoDevelopment: true,
  tracesSampleRate: 1.0,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});
// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   if (Platform.OS === "android") {
//     await Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   return token;
// }
export const navigationRef = createNavigationContainerRef();

function App() {
  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold: Poppins_600SemiBold,
    Poppins_400Regular: Poppins_400Regular,
    Poppins_500Medium: Poppins_500Medium,
    Poppins_700Bold: Poppins_700Bold,
  });
  const [routeName, setRouteName] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [appState, setAppState] = useState("INACTIVE");
  const [isNetworkConnect, setIsNetworkConnect] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();
  async function readInternetConnection() {
    NetInfo.addEventListener((state) => {
      setIsNetworkConnect(state.isConnected);
    });
  }
  updateAppStatus = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    const status = AppState.currentState.toUpperCase();
    if (appState !== status) {
      let params = {
        id: userId,
        status: status,
      };
      const tokenDetail = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
      const response = await makePutApiCall(
        "/elga-roma/user/status",
        {},
        tokenDetail,
        params
      );
      if (response?.status) {
        setAppState(status);
      }
      console.log("AppState", response);
    }
  };

  useEffect(() => {
    // Analytics.setDebugModeEnabled(true);
    readInternetConnection();
    // updateAppStatus();
    return () => null;
  }, []);

  // useEffect(() => {
  //   // registerForPushNotificationsAsync().then((token) =>
  //   //   setExpoPushToken(token)
  //   // );

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();
  // }, []);
  const Stack = createNativeStackNavigator();
  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }
  // const config = {
  //   screens: {
  //     FeedDetails: {
  //       path: "FeedDetails/:id",
  //       parse: {
  //         id: (id) => `${id}`
  //       }
  //     },
  //   },
  // };
  // const prefix = Linking.createURL('/');
  // const linking = {
  //   prefixes: [prefix],
  //   config,
  // };
  if (!fontsLoaded) {
    return (
      <SafeAreaView>
        <ImageBackground style={{ flex: 1 }} source={IMAGES.splashScreen} />
      </SafeAreaView>
    );
  } else {
    if (!isNetworkConnect) {
      return (
        <View>
          <InternetBottomSheet />
        </View>
      );
    } else {
      return (
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                setRouteName(navigationRef.getCurrentRoute().name);
              }}
              // linking={linking}
              onStateChange={async () => {
                const previousRouteName = routeName;
                const currentRouteName = navigationRef.getCurrentRoute().name;
                setRouteName(currentRouteName);
              }}
            >
              <Stack.Navigator>
                <Stack.Screen
                  name="SplashScreen"
                  component={SplashScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="OtpScreen"
                  component={OtpScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Identity"
                  component={Identity}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="UserCategory"
                  component={UserCategory}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="BasicDetailsName"
                  component={BasicDetailsName}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="More"
                  component={More}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Social"
                  component={Socials}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Profile"
                  component={SelfViewProfile}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Search"
                  component={Search}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SearchDetail"
                  component={SearchDetail}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="EditPage"
                  component={EditPage}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="EditTags"
                  component={EditTags}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="EditCategory"
                  component={EditCategory}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="EditCompany"
                  component={EditCompany}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="BrandSelfView"
                  component={BrandSelfView}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CreatorProfile"
                  component={CreatorProfile}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="BrandProfile"
                  component={BrandProfile}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Discover"
                  component={Discover}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AddParticipants"
                  component={AddParticipants}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Notifications"
                  component={NotificationPage}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Projects"
                  component={Projects}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Saved"
                  component={Saved}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Chat"
                  component={Chat}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CollabPage"
                  component={CollabPage}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SuccessPage"
                  component={SuccessPage}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ChatRoom"
                  component={ChatRoom}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Opportunity"
                  component={Opportunity}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Collaborates"
                  component={Collaborates}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PendingPage"
                  component={PendingPage}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="FilterPage"
                  component={FilterPage}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AddMember"
                  component={AddMember}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CircleInfo"
                  component={CircleInfo}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ProjectInfo"
                  component={ProjectInfo}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ImagePreview"
                  component={ImagePreview}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Setting"
                  component={Setting}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ComingSoonPage"
                  component={ComingSoonPage}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="RewardPage"
                  component={RewardPage}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="FolioDetail"
                  component={FolioDetail}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AccountSettings"
                  component={AccountSettings}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Circle"
                  component={Circle}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ProfileProgress"
                  component={ProfileProgress}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="LinkPreview"
                  component={LinkPreview}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Explore"
                  component={Explore}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Moodboard"
                  component={Moodboard}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ChatMoodboard"
                  component={ChatMoodboard}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="InstagramLink"
                  component={InstagramLink}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CreatorChallenges"
                  component={CreatorChallenges}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="FeedDetails"
                  component={FeedDetails}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>

              {routesToShowReward?.includes(routeName) ? (
                <RewardButton />
              ) : null}
            </NavigationContainer>
            <StatusBar translucent backgroundColor="transparent" />
          </View>
        </Provider>
      );
    }
  }
}

export default App;
