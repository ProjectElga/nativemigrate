import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
const borderRadius = RFValue(12, 844);
export const Styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(16, 844)
  },
  bottomContainer: {
    width: "100%",
    padding: RFValue(16, 844),
  },
  iconWrapper: {
    width: RFValue(25, 844),
    height: RFValue(25, 844),
    borderRadius: RFValue(50, 844),
    backgroundColor: COLORS.monoWhite900,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    width: "100%",
    height: RFValue(180, 844),
    shadowColor: "#555555",
    shadowOpacity: Platform.OS == "ios" ? 0.7 : 0.7,
    //elevation: Platform.OS == "ios" ? 3 : 1,
    overflow:"hidden",
    borderTopLeftRadius: RFValue(12, 844),
    borderTopRightRadius: RFValue(12, 844)

  },
  svgIconContainer: {
    width: RFValue(28, 844),
    height: RFValue(28, 844),
    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(1000, 844),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: RFValue(12, 844),
    top: RFValue(12, 844),
    zIndex:10
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginLeft: RFValue(20, 844),
  },
  images: {
    width: RFValue(64, 844),
    height: RFValue(64, 844),
    borderRadius: RFValue(12, 844),
  },
  text: {
    color: COLORS.monoBlack900,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
  },
  title: {
    color: COLORS.monoBlack900,
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(14, 844),
  },
});
