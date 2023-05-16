import React from "react";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
  wrapper: {
    width: RFValue(60, 844),
    height: RFValue(60, 844),
    position: "absolute",
    bottom: 100,
    right: 24,
    borderRadius: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#555555",
    shadowOpacity: Platform.OS == "ios" ? 0.5 : 0.5,
    elevation: Platform.OS == "ios" ? 3 : 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
export default styles;
