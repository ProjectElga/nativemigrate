import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { Component, useState } from "react";
import {
  View,
  Image,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
const height = Dimensions.get("window").height;
import COLORS from "../../../../themes/colors";
import IMAGES from "../../../../themes/Images";

export default class ActionButtonModal extends Component {
  render() {
    return (
      <View>
    
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingRight: RFValue(24, 844),
    paddingBottom:
      Platform.OS == "ios" ? height * (12 / 100) : height * (9 / 100),
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#0000004a",
    shadowOpacity: 1,
    // background color must be set
    backgroundColor: "#0000004a",
  },
  optionContainer: {
    borderRadius: RFValue(20, 844),
    backgroundColor: COLORS.monoWhite900,
    justifyContent: "space-between",
  },
  divider: {
    borderWidth: 1,
    borderColor: "#eeeeee",
  },
  optionButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: RFValue(24, 844),
    alignItems: "center",
    paddingBottom: RFValue(24, 844),
    paddingTop: RFValue(24, 844),
  },
  optionText: {
    fontFamily: "Poppins_700Bold",
    color: COLORS.primaryTeal500,
    fontSize: RFValue(16, 844),
    marginLeft: RFValue(16, 844),
    alignSelf: "center",
  },

  button: {
    marginTop: RFValue(10, 844),
    backgroundColor: COLORS.primaryTeal500,
    width: RFValue(56, 844),
    height: RFValue(56, 844),
    borderRadius: RFValue(20, 844),
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
    resizeMode:"contain"
  },
});
