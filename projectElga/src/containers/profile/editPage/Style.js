import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../themes/colors";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../../constants/ScreenSize";
const width = Dimensions.get("window").width;
const Styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.monoWhite900,
    height: "100%",
    paddingTop: RFValue(64, 844),
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
  disableLayout:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    opacity: 0.5
  },
  comingSoonLayout:{
    flexDirection: "row",
    alignItems: "center",
    borderColor:COLORS.monoBlack700,
    paddingVertical: RFValue(5,844),
    paddingHorizontal: RFValue(15,844),
    borderWidth:1,
    borderRadius: 100,
    marginLeft: RFValue(10,844)
  },
  comingSoonText:{
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(10, 844),
    color: COLORS.monoBlack700,
  },
  editContainer: {
    paddingBottom: RFValue(26, 844),
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(16, 844),
    marginBottom: RFValue(24, 844),
    paddingHorizontal:RFValue(16,844)
  },

  editIconWrapper: {
    flexDirection: "row",
    zIndex: 1,
    position: "absolute",
    alignItems: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: RFValue(32, 844),
  },
  divider: {
    borderColor: COLORS.monoGhost500,
    borderWidth: 1,
    width: "73%",
  },
  collaborationText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: COLORS.monoBlack500,
    marginLeft: 8,
  },
  editText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    color: COLORS.monoWhite900,
    marginLeft: 4,
  },
  bgImg: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  profileOverlay: {
    backgroundColor: "#000000",
    width: RFValue(105, 844),
    height: RFValue(105, 844),
    borderRadius: RFValue(55, 844),
    opacity: 0.4,
  },
coverOverlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  
    opacity: 0.4,
  },
  profilePicture: {
  
    width: RFValue(104, 844),
    height: RFValue(104, 844),
    borderRadius: RFValue(55, 844),
    resizeMode: "contain",
    alignSelf: "center",
    shadowOpacity: 0.1,
    //marginTop:RFValue(-52, 844),
  },
  coverPicture: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,

    resizeMode: "contain",
    alignSelf: "center",
    shadowOpacity: 0.1,
  },
  plusIconContainer: {
    backgroundColor: COLORS.monoGhost500,
    width: "20%",
    borderRadius: RFValue(12, 844),
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(12, 844),
    marginLeft: "-10%",
  },
  componentContainer: {
    width: "100%",
  },
  componentText: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(16, 844),
    marginLeft: RFValue(8, 844),
    color: COLORS.primaryTeal500,
  },
  managingWrapper: {
    marginTop: RFValue(24, 844),
    width: width - RFValue(32, 844),
  },
  managingText: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(16, 844),
    color: COLORS.primaryTeal500,
    marginLeft: 8,
  },

  managingUserContainer: {
    height: RFValue(40, 844),
    width: RFValue(124, 844),
    marginTop: RFValue(12, 844),
    borderRadius: RFValue(12, 844),
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: COLORS.monoGhost500,
  },
  managingCardContainer: {
    width: width - RFValue(32, 844),

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: RFValue(16, 844),
  },
  managingCardPic: {
    width: RFValue(48, 844),
    height: RFValue(48, 844),
    resizeMode: "contain",
  },
  managingCardDisplayName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack900,
  },
  managingCardUsername: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack500,
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
  multiLineInput: {
    lineHeight: RFValue(24, 844),
  },
  componentContainerWithLeftIcon: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: COLORS.monoGhost500,
    marginTop: RFValue(10, 844),
    borderRadius: RFValue(12, 844),
    paddingHorizontal: RFValue(25, 844),
  },
  componentInputWithLeftIcon: {
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.monoBlack700,
    width: "90%",
    paddingVertical: RFValue(17, 844),
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,
    fontSize: RFValue(12, 844),
  },
  pricingPlusContainer: {
    marginTop: RFValue(10, 844),
    paddingTop: RFValue(8, 844),
    paddingBottom: RFValue(8, 844),
    alignItems: "center",
    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(12, 844),
    width: RFValue(124, 844),
  },
  pricingInput: {
    marginTop: RFValue(10, 844),
    height: RFValue(56, 844),
    alignItems: "center",
    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(12, 844),
    width: "100%",
    paddingHorizontal: RFValue(25, 844),
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.monoBlack500,
  },
  pricingInputText: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack700,
  },
  icon: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
  },
  rupeesContainer: {
    width: RFValue(50, 844),
    borderTopRightRadius: RFValue(12, 844),
    borderBottomRightRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,
    marginTop: RFValue(10, 844),
    paddingTop: RFValue(12, 844),
    paddingBottom: RFValue(12, 844),
  },
  rupeesText: {
    color: COLORS.monoBlack500,
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
    lineHeight: RFValue(24, 844),
  },
});
export default Styles;
