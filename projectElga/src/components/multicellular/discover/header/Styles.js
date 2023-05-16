import React, { Component } from "react";
import { Platform, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
const Styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // marginHorizontal: RFValue(12, 844),
    //paddingHorizontal: RFValue(12, 844),
    //marginTop: RFValue(-12, 844),
    marginBottom: RFValue(16, 844),
  },
  text: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(32, 844),
    color: COLORS.monoBlack900,
  },
  logo: {
    width: RFValue(147, 844),
    height: RFValue(26, 844),
  },
  headerIconView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pageTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(24, 844),
    color: COLORS.monoBlack900,
    marginLeft: RFValue(5, 844),
    marginBottom: Platform.OS == "ios" ? 0 : -4,
  },
  iconWrapper: {
    width: RFValue(40, 844),
    height: RFValue(40, 844),
    borderRadius: RFValue(50, 844),
    borderWidth: 2,
    backgroundColor: COLORS.monoWhite900,
    borderColor: COLORS.monoWhite900,
    alignItems: "center",
    justifyContent: "center",
  },
  filterIconWrapper: {
    width: RFValue(32, 844),
    height: RFValue(32, 844),
    borderRadius: RFValue(50, 844),
    borderWidth: 2,
    backgroundColor: COLORS.monoWhite900,
    borderColor: COLORS.monoWhite900,
    alignItems: "center",
    justifyContent: "center",
  },
  
  iconPosition:{
    position:"absolute",
    right:0
  },
  iconContainer: {
    borderWidth: 2,
    // backgroundColor: COLORS.monoWhite900,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: RFValue(100,844),
    marginLeft: RFValue(20, 844),
    paddingLeft:RFValue(8,844),
    position:"relative",
    width:RFValue(76,844),
    height: RFValue(32, 844),
  },
  profileprogressText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
    marginRight: RFValue(6, 844),
    color: COLORS.monoWhite900
  },
  icon: {
    width: "100%",
    height: "100%",
    shadowColor: "#555555",
    shadowOpacity: Platform.OS == "ios" ? 0.7 : 0.7,
    //elevation: Platform.OS == "ios" ? 3 : 1,

    borderRadius: RFValue(1000, 844),
    borderColor: "white",
    borderWidth: 1,
  },
});
export default Styles;
