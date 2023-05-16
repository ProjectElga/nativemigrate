import { useNavigation } from "@react-navigation/native";
import SvgUri from "expo-svg-uri";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SVGS from "../../../constants/SvgUri";
import COLORS from "../../../themes/colors";

export default function Invite() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("RewardPage");
      }}
    >
      <View style={Styles.wrapper}>
        <Text style={Styles.text}>Invite</Text>
        <SvgUri svgXmlData={SVGS.BLUE_RIGHT_ARROW} />
      </View>
    </TouchableOpacity>
  );
}
const Styles = StyleSheet.create({
  wrapper: {
    paddingBottom: RFValue(12, 844),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: COLORS.teritiaryPurple,
    fontSize: RFValue(20, 844),
    fontFamily: "Poppins_600SemiBold",
    marginRight: RFValue(4, 844),
  },
});
