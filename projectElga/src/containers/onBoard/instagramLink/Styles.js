import React, { Component } from "react";
import { Platform, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";
const Styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: RFValue(30, 844),
    paddingTop: RFValue(48, 844),
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.monoWhite900,
  },
  box:{
    width:"100%",
  },
  modal: {
    width: "80%",
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(16, 844),
    paddingVertical: RFValue(20, 844),
    justifyContent: "center",
    alignItems: "center",
  },
  modalTextDetail:{
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(16, 844),
    textAlign: "center",
    paddingHorizontal: RFValue(20, 844),
    borderBottomColor: COLORS.monoChromeBlack,
    borderBottomWidth: RFValue(1,844),
    paddingBottom:RFValue(16,844),
    marginBottom: RFValue(16,844)
  },
  modalBtnText:{
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(16, 844),
    textAlign: "center",
    color: COLORS.primaryTeal400
  },
  modalWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    //borderRadius: RFValue(16, 844),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  footerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    width: "100%",
    paddingVertical: RFValue(16, 844),
  },
  detailsWrapper: {
    width: "100%",
    flex: 1,
    marginBottom: RFValue(10, 844),
  },
  detailsHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: RFValue(24, 844),
  },
  detailsBody: {
    borderTopColor: COLORS.monoChromeBlack,
    borderTopWidth: RFValue(1, 844),
    paddingVertical: RFValue(24, 844),
  },
  socialMediaLogo: {
    width: RFValue(67, 844),
    height: RFValue(40, 844),
  },
  linkingGifWrapper: {
    width: "100%",
    aspectRatio: 1 / 1,
    marginTop: RFValue(24, 844),
    marginBottom: RFValue(24, 844),
  },
  linkingGif: {
    width: "100%",
    aspectRatio: 1 / 1,
    backgroundColor: COLORS.monoBlack700,
    overflow: "hidden",
  },
  text: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
  },
  textBig: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(16, 844),
  },
  heading: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(18, 844),
  },
  rejectBtn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(12, 844),
    width: "48%",
    paddingVertical: RFValue(14, 844),
  },
  detailHeaderText: {
    width: RFValue(220, 844),
    textAlign: "center",
    marginTop: RFValue(16, 844),
  },
  acceptBtn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.monoBlack900,
    borderRadius: RFValue(12, 844),
    width: "48%",
    paddingVertical: RFValue(14, 844),
  },
  rejectBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack900,
  },
  acceptBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoGhost500,
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
  profileprogressText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
    marginRight: RFValue(6, 844),
    color: COLORS.monoWhite900,
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
