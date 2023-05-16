import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../constants/ScreenSize";
import COLORS from "../../themes/colors";

const Styles = StyleSheet.create({
  buttonText: {
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoWhite900,
    fontSize: RFValue(14, 844),
  },
  userWrapper: {
    width: RFValue(240, 844),
    marginLeft: RFValue(20, 844),
    paddingVertical: RFValue(20, 844),
    
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(24, 844),
    //borderWidth: 1,
    //borderColor: COLORS.monoGhost500,
    shadowColor: COLORS.monoBlack900,
    // shadowOffset: { width: 12, height: 3 },
    shadowOpacity: 0,
    shadowRadius: 20,
    elevation: 3,
  },
  topWrapperCard: {
    alignItems: "center",
    paddingHorizontal: RFValue(32, 844),

  },
  userImageWrapper: {
    width: RFValue(88, 844),
    height: RFValue(88, 844),
    aspectRatio: 1 / 1,
    borderRadius: RFValue(44, 844),
  },
  userImage: { width: RFValue(88, 844), height: RFValue(88, 844), borderRadius: RFValue(44, 844), },
  userName: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack900,
    marginTop: RFValue(12, 844),
  },
  subCategories: {
    flexDirection: "row",
    marginTop: 2,
  },
  subCategoryText: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack500,
    //width: RFValue(250, 844),
    textAlign: "center",
  },
  userBio: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack700,
    //width: RFValue(250, 844),
    textAlign: "center",
  },
  bottomWrapperCard: {
    alignItems: "center",
    width: "100%",
    marginTop: RFValue(12, 844),
  },
  divider: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.monoGhost500,
  },
  buttonWrapper: { width: "100%", paddingHorizontal: RFValue(32, 844) },
  button: {
    width: "100%",
    height: RFValue(40, 844),
    borderRadius: RFValue(115, 844),
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(16, 844),
    backgroundColor: COLORS.monoBlack900,
  },
  horizontalScroll: {
    // height: RFValue(320, 844),
    marginTop: RFValue(16, 844),
 
  },
  scrollContainer: {
    alignItems: "center",
    paddingRight: RFValue(20, 844),
    paddingVertical: RFValue(8, 844)
  },
  bottomTextWrapper: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: RFValue(16, 844),
  },
  messageIcon: {
    backgroundColor: COLORS.monoGhost500,
    height: RFValue(48, 844),
    width: RFValue(48, 844),
    borderRadius: RFValue(24, 844),
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: RFValue(16, 844),
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    width: "85%",
    color: COLORS.monoBlack500,
  },
});
export default Styles;
