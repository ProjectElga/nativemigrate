import React, { Component } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
const Styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(16, 844),
    width: RFValue(156, 844),
    height: RFValue(96, 844),
    marginRight: RFValue(16, 844),
  },
  imageStyle: {
    borderRadius: RFValue(15, 844),
  },
  svgIcon:{
    width: RFValue(18, 844),
    height: RFValue(18, 844),
    marginRight:RFValue(8,844),
  },
  text: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(18, 844),
    lineHeight: RFValue(24, 844),
    color: COLORS.monoWhite900,
  },
  logo: {
    width: RFValue(147, 844),
    height: RFValue(26, 844),
  },
  card: {
    width: "98%",
    // height: RFValue(118, 844),
    margin: 4,
    alignSelf: "center",
    paddingBottom: RFValue(24, 844),
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(15, 844),
    marginBottom: RFValue(16, 844),
  },
  picDetailWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  profilePicture: {
    width: RFValue(80, 844),
    height: RFValue(80, 844),
    borderRadius: RFValue(50, 844),
    marginTop: RFValue(-40, 844),
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: RFValue(50, 844),
    borderWidth:1.5,
    borderColor:COLORS.monoGhost500,
    backgroundColor: '#E8A0BF'
  },
  profileNameText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack900,
    lineHeight: RFValue(20, 844),

    marginTop: RFValue(20, 844),
  },
  userDetailView: {
    width: "100%",
  },
  subCategory: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack700,
    // marginTop: RFValue(4, 844),
  },
  brandInfo: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack700,
    marginTop:2.5
    //width: 140,
  },
  lowerLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: RFValue(4, 844),
    width: "100%",
  },
  bioText: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack700,
    lineHeight: RFValue(24, 844),
    marginLeft: 8,
  },
  bioCategory: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.primaryTeal400,
  },
  upperLayout: {
    flexDirection: "row",

    alignItems: "center",
  },
  followerDetailContainer: {
    marginTop:6,
    marginBottom: -8,
  
    width: "100%",
  },
  tag:{
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_400Regular",
    color: COLORS.primaryTeal500,
  },
  number: {
    color: COLORS.primaryTeal500,
    fontSize: RFValue(16, 844),
    fontFamily: "Poppins_700Bold",
    marginRight: RFValue(10, 844),
  },
  textReach: {
    marginTop: -4,
    color: COLORS.monoBlack500,
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_400Regular",
    marginRight: RFValue(10, 844),
  },
  btn: {
    backgroundColor: COLORS.primaryTeal500,
    paddingVertical: RFValue(12, 844),
    paddingHorizontal: RFValue(36, 844),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(24, 844),
  },
  btnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(14, 844),
    color: COLORS.monoWhite900,
  },
  saveIcon: {
    width: RFValue(15, 844),
    height: RFValue(15, 844),
  },
});
export default Styles;
