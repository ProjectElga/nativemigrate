import { Platform, StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../../constants/ScreenSize";
import COLORS from "../../../themes/colors";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width - RFValue(32, 844);
const Styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
    paddingTop: RFValue(64, 844),
    backgroundColor: COLORS.monoWhite900,
    height: "90%",
  },
  fileContainer: {
    flexDirection: "row",
    paddingRight: RFValue(16, 844),
    marginTop: RFValue(24, 844),
    paddingLeft: RFValue(16, 844),
    alignItems: "flex-end",
  },
  fileCard: {
    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(16, 844),
    flexDirection: "row",
    marginRight: RFValue(16, 844),
  },
  fileImage: { width: RFValue(72, 844), height: RFValue(72, 844) },
  fileNameText: {
    fontSize: RFValue(12, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack700,
  },
  fileTextContainer: {
    marginLeft: RFValue(16, 844),
    paddingVertical: RFValue(12, 844),
    justifyContent: "space-evenly",
  },
  fileSizeText: {
    fontSize: 8,
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack700,
  },
  blackCross: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
  },
  bodyWrapper: {
    width: "100%",
    paddingBottom: RFValue(44, 844),
  },
  textIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputBarTitletext: {
    color: COLORS.monoBlack700,
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(12, 844),
    marginLeft: RFValue(12, 844),
  },
  inputBar: {
    paddingHorizontal: RFValue(20, 844),
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.monoBlack700,
    marginTop: RFValue(8, 844),
    width: "100%",
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,
    fontSize: RFValue(12, 844),
    paddingVertical: RFValue(22, 844),
  },
  projectTypeCard: {
    paddingHorizontal: RFValue(32, 844),
    marginTop: RFValue(8, 844),
    paddingVertical: RFValue(12, 844),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(12, 844),
    marginRight: RFValue(12, 844),
  },
  projectTypeCardText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    lineHeight: RFValue(24, 844),
  },
  rupeesContainer: {
    paddingHorizontal: RFValue(10, 844),
    paddingVertical: RFValue(4, 844),
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,
  },
  rupeesText: {
    color: COLORS.primaryTeal500,
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    lineHeight: RFValue(24, 844),
  },
  buttonContainer: {
    width: "100%",
    height: SCREENSIZE.BottomNavBarViewPort,
    flexDirection: "row",
    paddingHorizontal: RFValue(16, 844),
    backgroundColor: COLORS.monoWhite900,
    justifyContent: "space-between",
  },
  attachmentBtn: {
    backgroundColor: COLORS.monoGhost500,
    padding: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(24, 844),
    borderRadius: RFValue(16, 844),
  },
  attachmentBtnText: {
    fontSize: RFValue(12, 844),
    lineHeight: RFValue(32, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack700,
  },
  attachmentBtnicon: {
    paddingTop: 5,
    paddingRight: 5,
  },
});
export default Styles;
