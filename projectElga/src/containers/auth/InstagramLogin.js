import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STORAGE_KEY from "../../constants/StorageKeys";
import IMAGES from "../../themes/Images";
import logout from "../../utils/Logout";

function SplashScreen(props) {
  useEffect(() => {
    effect();
  }, []);
  const effect = async () => {
    //logout()
    const isLogin = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const isNew = await AsyncStorage.getItem(STORAGE_KEY.IS_NEW_USER);
    const isCreator = await AsyncStorage.getItem(STORAGE_KEY.ISCREATOR);

    if (isLogin && isLogin !== "" && typeof isLogin !== "undefined") {
      if (isNew === "true" && typeof isNew !== "undefined") {
        props.navigation.navigate("BasicDetailsName");
      }
      if (isNew === null) {
        props.navigation.navigate("BasicDetailsName");
      }
      if (isNew === "false") {
        // if (isCreator === 'true' && typeof isCreator !== "undefined") {
        //     props.navigation.navigate("Profile");
        // }
        // else {
        //     if (isCreator === 'false' && typeof isCreator !== "undefined") {
        //         props.navigation.navigate("BrandSelfView");
        //     }
        //     else{
        props.navigation.navigate("Discover");
        //}

        //  }
      }
    } else {
      props.navigation.navigate("LoginScreen");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={IMAGES.splashScreen} />
    </SafeAreaView>
  );
}
export default SplashScreen;
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
