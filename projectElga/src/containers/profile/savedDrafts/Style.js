import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";

const Styles = StyleSheet.create({
  headerIconView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrapper: {
    width: RFValue(32, 844),
    height: RFValue(32, 844),
    borderRadius: RFValue(50, 844),
    marginLeft: RFValue(32, 844),
    justifyContent: "center",
    // borderWidth:2,
    alignItems: "center",
  },
  divider: {
    width: "100%",
    borderColor: COLORS.monoGhost500,
    borderWidth: 1,
  },
  searchIcon: {
    padding: RFValue(10, 844),
  },
  icon: {
    width: RFValue(32, 844),
    height: RFValue(32, 844),
    resizeMode: "contain",
  },
  wrapper: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
    backgroundColor: COLORS.monoWhite900,
    paddingHorizontal: 25,
    paddingTop: RFValue(48, 844),
    justifyContent: "space-between",
  },
  input: {
    paddingRight: RFValue(10, 844),
    paddingLeft: 0,
    color: COLORS.monoBlack500,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    alignItems: "center",
    width: "90%",
    height: "100%",
  },
  searchSection: {
    // flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.monoGhost500,
    paddingVertical: RFValue(8, 844),
    borderRadius: RFValue(12, 844),
    paddingHorizontal: RFValue(16, 844),
    marginTop: RFValue(30, 844),
  },
  cardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: RFValue(32, 844),
  },
  titleText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack900,
  },
  expandCard: {
    flexDirection: "row",
    paddingVertical: RFValue(20, 844),
  },
  thumbnail: {
    width: RFValue(64, 844),
    height: RFValue(64, 844),
    borderRadius: RFValue(32, 844),
  },
  expandCardRightWrapper: {
    marginLeft: RFValue(16, 844),
    width: "70%",
  },
  rightCardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack900,
  },
  rightCardSubtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack500,
    marginTop: 8,
  },
});
export default Styles;
