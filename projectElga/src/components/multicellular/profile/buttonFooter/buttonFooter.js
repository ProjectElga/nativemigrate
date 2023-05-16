import SCREENSIZE from "../../../../constants/ScreenSize";
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import COLORS from "../../../../themes/colors";
import ProfileButton from "../button/profileButton";
import { RFValue } from "react-native-responsive-fontsize";
export default class ButtonFooter extends Component {
  render() {
    return (
      <View style={Styles.buttonContainer}>
        <ProfileButton
          text="Save Draft"
          bg={COLORS.monoGhost500}
          width="48%"
          textColor={COLORS.monoBlack500}
        />
        <ProfileButton
          text="Post"
          bg={COLORS.primaryTeal500}
          width="48%"
          textColor={COLORS.monoWhite900}
        />
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  buttonContainer: {
    height:SCREENSIZE.BottomNavBarViewPort,
    width: "100%",
    flexDirection: "row",
    paddingTop: 24,
    paddingBottom: 43,
    justifyContent: "space-between",
    alignItems:"flex-start",
    paddingHorizontal: RFValue(16, 844),
    paddingTop: RFValue(64, 844),
    backgroundColor: COLORS.monoWhite900,
  },
});
