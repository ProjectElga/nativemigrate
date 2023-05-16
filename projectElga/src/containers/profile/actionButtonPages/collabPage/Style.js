import { Platform, StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../../../constants/ScreenSize";
import COLORS from "../../../../themes/colors";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width - RFValue(32, 844);
const Styles = StyleSheet.create({
  wrapper: {
    paddingTop: RFValue(64, 844),
  },
  blackCross: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
  },
  bodyWrapper: {
    paddingTop: RFValue(24, 844),
    width: "100%",
    paddingBottom: RFValue(43, 844),
  },
  saveText: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoWhite900,
  },
  saveButton: {
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(10, 844),
    backgroundColor: COLORS.primaryTeal400,
    borderRadius: RFValue(200, 844),
    alignItems: "center",
    justifyContent: "center",
  },
  textIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: RFValue(12, 844),
  },

  componentText: {
    color: COLORS.monoBlack900,
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(16, 844),
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: RFValue(8, 844),
    alignItems: "flex-end",
  },
  inputBar: {
    paddingHorizontal: RFValue(25, 844),
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.monoBlack700,
    marginTop: RFValue(10, 844),
    width: "100%",
    paddingTop: RFValue(15, 844),
    paddingBottom: RFValue(15, 844),
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,
    fontSize: RFValue(12, 844),
  },
  participantsNumber: {
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.monoBlack500,
    fontSize: RFValue(14, 844),
    color: COLORS.monoWhite900

  },
  participantsContainer:{
  width: RFValue(48, 844),
  height: RFValue(48, 844),
  borderRadius: RFValue(24, 844),
  borderWidth: 2,
  borderColor: COLORS.monoGhost500,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  marginLeft:  RFValue(-8, 844),
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  position:"absolute",
  right:0,
  top:0,
  zIndex:10
},
  multiLineInput: {
    lineHeight: RFValue(24, 844),
  },
  projectTypeCard: {
    paddingHorizontal: RFValue(32, 844),
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
  fileContainer: {
    flexDirection: "row",
    marginTop: RFValue(24, 844),
    paddingRight: RFValue(8, 844),
    paddingLeft: RFValue(24, 844),
  },
  fileCard: {
    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(16, 844),
    flexDirection: "row",
    marginRight: RFValue(16, 844),
    height: RFValue(72, 844),
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
  rupeesContainer: {
    paddingHorizontal: RFValue(10, 844),
    paddingVertical: RFValue(4, 844),
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,
  },
  rupeesText: {
    color: COLORS.primaryTeal500,
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(10, 844),
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    paddingTop: 24,
    justifyContent: "space-between",
  },
  modalWrapper: {
    width: width + RFValue(32, 844),
    height: height,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.monoBlack500,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 0,
  },
  modalCard: {
    width: "90%",
    height: RFValue(250, 844),
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(12, 844),
    zIndex: 1,
    paddingHorizontal: RFValue(24, 844),
    paddingTop: RFValue(24, 844),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "20%",
  },
  modalPricingText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(20, 844),
    color: COLORS.primaryTeal500,
  },
  modalColumnWrapper: {
    flexDirection: "row",
    marginTop: RFValue(20, 844),
    paddingBottom: RFValue(24, 844),
  },
  modalColumn1Wrapper: {
    width: "33%",
    justifyContent: "space-between",
    height: "80%",
  },
  modalColumnValues: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: "#161616",
    alignItems: "flex-start",
  },
  divider: {
    borderWidth: 1,
    borderColor: COLORS.monoGhost500,
    width: "100%",
  },
  modalColumn2Wrapper: {
    width: "33%",
    justifyContent: "space-between",
    height: "80%",
    alignItems: "center",
  },
  modalColumn3Wrapper: {
    width: "33%",
    justifyContent: "space-between",
    height: "80%",
    alignItems: "flex-end",
  },
});
export default Styles;
