import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, TextInput, BackHandler, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AuthHeader from "../../../components/multicellular/auth/header";
import NextButton from "../../../components/multicellular/general/nextButton";
import COLORS from "../../../themes/colors";
import STORAGE_KEY from "../../../constants/StorageKeys";
import * as Analytics from "expo-firebase-analytics";
function BasicDetailsName(props) {
  const [name, setName] = useState("");
  const handleNameChange = async (text) => {
    setName(text);
    await AsyncStorage.setItem(STORAGE_KEY.USER_DISPLAY_NAME, text);
  };
  const handleNext = async () => {
    const userId = await AsyncStorage.getItem(STORAGE_KEY.USER_ID);
    Analytics.logEvent("onboard_setUserName", {
      contentType: "etUserName",
      userId: userId,
      displayName: name,
    });
    props.navigation.navigate("Identity");
  };
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={Styles.wrapper}>
      <View>
        <AuthHeader
          title="Basic Details"
          subtitle="Enter your name"
          description="Tell us Your name behind the stage"
        />
        <TextInput
          style={Styles.input}
          placeholder="Enter your Full Name"
          placeholderTextColor={COLORS.monoBlack500}
          onChangeText={(text) => {
            handleNameChange(text);
          }}
        />
      </View>
      <View style={{ alignSelf: "flex-end", width: "40%" }}>
        <NextButton
          disabled={name && name?.length > 3 ? false : true}
          opacity={name && name?.length > 3 ? 1 : 0.7}
          onPress={handleNext}
        />
      </View>
    </View>
  );
}
export default BasicDetailsName;
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
  input: {
    height: RFValue(64, 844),
    paddingHorizontal: RFValue(16, 844),
    width: "100%",
    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(16, 844),
    color: COLORS.monoBlack900,
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(16, 844),
    marginTop: RFValue(20, 844),
  },
});
