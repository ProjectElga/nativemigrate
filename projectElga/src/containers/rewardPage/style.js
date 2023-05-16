import React from "react";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../themes/colors";
const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: RFValue(284, 844),
    backgroundColor: "#001734",
    justifyContent: "flex-end",
  },
  backIcon:{ position: "absolute", top: 60, left: 16 },
  headerText:{
    width: "60%",
    alignSelf: "center",
    marginBottom: RFValue(132, 844),
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(20, 844),
    color: COLORS.monoWhite900,
    textAlign: "center",
  },
  shareCard:{
    width: "100%",
    paddingHorizontal: RFValue(18, 844),
    marginTop: -RFValue(108, 844),
  },
  shareGradient:{
    width: "100%",
    height: RFValue(216, 844),
    borderRadius: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "center",
  },shareText:{
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(20, 844),
    color: COLORS.monoWhite900,
  },
  shareSubText:{
    width: "50%",
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoWhite900,
    textAlign: "center",
  },
  shareButton:{
    width: "80%",
    backgroundColor: COLORS.monoWhite900,
    height: RFValue(56, 844),
    borderRadius: RFValue(16, 844),
    marginTop: RFValue(20, 844),
    paddingHorizontal: RFValue(16, 844),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkText:{
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack700,
  },
  rewardTypesWrapper:{
    marginTop: RFValue(32, 844),
  },
  rewardTypesText:{
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(20, 844),
    color: COLORS.monoBlack900,
  },
  rewardTypesSubtext:{
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack700,
  },
  scrollingCardStyle:{
    marginRight: -RFValue(16, 844),
    marginTop: RFValue(16, 844),
    paddingLeft: RFValue(16, 844),
  },
  rewardCardGradient:{
    marginRight: RFValue(16, 844),
    width: "100%",
    height: RFValue(280, 844),
    borderRadius: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "center",
  }
});

export default styles