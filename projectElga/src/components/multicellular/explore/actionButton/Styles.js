import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
const borderRadius = RFValue(1000, 844);
export const Styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLORS.monoWhite900,
    borderRadius: borderRadius,
    paddingVertical:RFValue(10, 844),
    paddingHorizontal:RFValue(10, 844)

  },
  text: {
    color: COLORS.monoBlack900,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    marginLeft: RFValue(10, 844),
    lineHeight: RFValue(20, 844)
  },
});
