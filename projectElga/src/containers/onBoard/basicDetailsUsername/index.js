import SvgUri from "expo-svg-uri";
import React from "react";

import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import AuthHeader from "../../../components/multicellular/auth/header";
import NextButton from "../../../components/multicellular/general/nextButton";
import SVGS from "../../../constants/SvgUri";
import COLORS from "../../../themes/colors";

function BasicDetailsUsername(props) {
  return (
    <View style={Styles.wrapper}>
      <View>
        <AuthHeader title="Basic Details" subtitle="Create A Username" />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.monoGhost500,
            borderRadius: RFValue(16, 844),
            height: RFValue(64, 844),
            color: COLORS.monoBlack900,
            marginTop: RFValue(20, 844),
          }}
        >
          <TextInput
            style={Styles.input}
            placeholder="Username"
            placeholderTextColor={COLORS.monoBlack500}
          />
          <View
            style={{
              width: "20%",
              alignItems: "flex-end",
              justifyContent: "center",
              height: "100%",
              paddingRight:RFValue(20,844)
              
            }}
          >
            <SvgUri
              svgXmlData={SVGS.CHECK_CIRCLE}
              width={RFValue(24, 844)}
              height={RFValue(24, 844)}
            />
          </View>
        </View>
      </View>
      <View style={{ alignSelf: "flex-end", width: "40%" }}>
        <NextButton onPress={() => {
            props.navigation.navigate("Identity");
          }}/>
      </View>
    </View>
  );
}
export default BasicDetailsUsername;
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
    paddingHorizontal: RFValue(16, 844),
    width: "80%",
    height: "100%",
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(16, 844),
    color:COLORS.monoBlack900
  },
});
