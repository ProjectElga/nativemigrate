import React, { Component, useState } from "react";
import { StyleSheet } from "react-native";
import COLORS from "../../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
const Styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: RFValue(16, 844),
    paddingTop: RFValue(64, 844),
    backgroundColor: COLORS.monoWhite900,
    height: "100%",
  },
  bottomWrapper: {
    paddingHorizontal: RFValue(24, 844),
    marginTop: RFValue(28, 844),
  },
  changeSocials: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack500,
    lineHeight: RFValue(32, 844),
  },
});

export default Styles;
