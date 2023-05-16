import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  imageBgWrapper: {
    width: "100%",
    height: "65%",
    justifyContent: "flex-end",
  
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(32, 844),
  },
  bottomSheetWrapper: {
    width: "100%",
    height: "35%",
    backgroundColor: COLORS.monoWhite900,
    borderTopRightRadius:RFValue(24,844),
    borderTopLeftRadius:RFValue(24,844),
    padding: RFValue(32, 844),
    justifyContent: "space-between",
  },
  crossIcon:{
    width: RFValue(40, 844),
    height: RFValue(40, 844),
    borderRadius: RFValue(22, 844),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.monoWhite900,
    position: "absolute",
    zIndex: 1,
    top: RFValue(60, 844),
    right: RFValue(20, 844),
  },
  comingSoonText:{
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.monoWhite900,
    fontSize: RFValue(14, 844),
  },paymentsText:{
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.monoWhite900,
    fontSize: RFValue(40, 844),
    marginTop: 8,
  },
  descriptionText:{
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoWhite900,
    fontSize: RFValue(14, 844),
    marginTop: 8,
  },
  bottomSheetTitle:{
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.monoBlack900,
    fontSize: RFValue(20, 844),
    backgroundColor: COLORS.monoWhite900,
    justifyContent: "space-between",
  },
  centerTextWrapper:{
    width: "100%",
    height: "40%",
    justifyContent: "space-between",
  },
  textWrapper:{ flexDirection: "row", width: "100%" },
  greenTickWrapper:{
    width: RFValue(16, 844),
    height: RFValue(16, 844),
    borderRadius: 8,
    backgroundColor: COLORS.primaryTeal500,
    alignItems: "center",
    justifyContent: "center",
  },
  tickTexts:{
    fontFamily: "Poppins_400Regular",
    color: COLORS.monoChatGray,
    fontSize: RFValue(14, 844),
    marginLeft: 8,
  },
  buttonWrapper:{
    flexDirection: "row",
    // borderWidth: 2,
    justifyContent: "space-between",
    //width: "100%",
    marginTop:RFValue(8,844)
  }
});
export default styles;
