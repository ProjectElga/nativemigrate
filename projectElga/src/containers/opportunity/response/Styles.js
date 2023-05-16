import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";

const Styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.monoWhite900,
    paddingHorizontal: RFValue(16, 844),
    paddingTop: RFValue(64, 844),
    height: "100%",
  },

  topCard: {
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(24, 844),
    paddingBottom: RFValue(24, 844),
    paddingHorizontal:RFValue(10,844)
  },
  bottomCard: {
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(24, 844),
    //padding: RFValue(24, 844),
    paddingHorizontal:RFValue(10,844)

  },
  overviewText: {
    color: COLORS.monoBlack900,
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(18, 844),
  },
  overviewNumberContainer: {
    flexDirection: "row",
    marginTop: RFValue(24, 844),
    justifyContent: "space-between",
  },
  overviewComponent: {
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 32,
    color: COLORS.primaryTeal500,
    fontFamily: "Poppins_700Bold",
  },
  numberText: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack900,
  },
  bottomCardScroll: {
    marginTop: RFValue(24, 844),
    marginBottom: RFValue(24, 844),
    borderRadius: RFValue(24, 844),
  },
  oppTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack900,
  },
  oppSubtitle: {
    marginTop: 8,
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(14,844),
    color: COLORS.monoBlack500,
  },
});

export default Styles;
