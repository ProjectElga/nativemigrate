import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../constants/StorageKeys";
import IMAGES from "../../themes/Images";
import { withNavigation } from "react-navigation";

import logout from "../../utils/Logout";
function SplashScreen(props) {
  useEffect(() => {
    effect();
  }, []);
  const effect = async () => {
    // logout()
    try {
      const isLogin = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
      const isNew = await AsyncStorage.getItem(STORAGE_KEY.IS_NEW_USER);
      const isCreator = await AsyncStorage.getItem(STORAGE_KEY.ISCREATOR);

      if (isLogin && isLogin !== "" && typeof isLogin !== "undefined") {
        if (isNew === "true" && typeof isNew !== "undefined") {
          props.navigation.replace("BasicDetailsName");
        }
        if (isNew === null) {
          props.navigation.replace("BasicDetailsName");
        }
        if (isNew === "false") {
          props.navigation.replace("Explore");
        }
      } else {
        props.navigation.replace("LoginScreen");
      }
    } catch (e) {
      props.navigation.replace("LoginScreen");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={IMAGES.splashScreen} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    padding: 15,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  contentCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    padding: 10,
  },
});
export default withNavigation(SplashScreen);
