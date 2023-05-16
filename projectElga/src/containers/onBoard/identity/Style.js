import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";

const Styles = StyleSheet.create({
  headerText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(50,844),
    color: COLORS.primaryTeal500,
    lineHeight:RFValue(54,844)
  },
  headerSubTitleText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(24,844),
    color: COLORS.monoBlack900,

  },
  headerDetailText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14,844),
    color: COLORS.monoBlack900,
  },
  wrapper: {
    paddingHorizontal: RFValue(20, 844) ,
    backgroundColor: COLORS.monoWhite900,
    width: "100%",
    height: "100%",

    paddingTop: RFValue(64, 844),
    paddingBottom: RFValue(24, 844),
    justifyContent: "space-between",
  },
  headerContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: RFValue(40,844),
  },
  identityBoxView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  identityBoxHeight: {
    width: "100%",
    marginVertical:2
  },
  identityLogo: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: "center",
  },
});
export default Styles;
