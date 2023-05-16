import { Platform, StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../../../constants/ScreenSize";
import COLORS from "../../../../themes/colors";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width - RFValue(33, 844);
const Styles = StyleSheet.create({
  wrapper: {
 
    paddingTop: RFValue(64, 844),
    backgroundColor: COLORS.monoWhite900,
    height: "90%",
    paddingBottom:RFValue(32,844)
   
  },
  blackCross: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
  },
  bodyWrapper: {
    paddingTop: RFValue(24, 844),
    width: "100%",

  },
  saveText: {
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoWhite900,
  },
  saveButton:{
    paddingHorizontal: RFValue(16,844),
    paddingVertical:RFValue(10,844),
    backgroundColor: COLORS.primaryTeal400,
    borderRadius: RFValue(200, 844),
    alignItems: "center",
    justifyContent: "center",
  },
  addImageContainer: {
    width: width,
    borderRadius: RFValue(16, 844),
    backgroundColor: COLORS.monoGhost500,
    alignItems: "center",
    justifyContent: "center",
    height: null,
    aspectRatio: 16 / 9,
  },
  plusIcon: {
    width: RFValue(48, 844),
    height: RFValue(48, 844),
  },
  carouselContainer: {
    width: "100%",
    borderRadius: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 16 / 9,
  },
  image: {
    width: width,
    height: undefined,
    aspectRatio: 16 / 9,
    justifyContent: "space-between",
    paddingTop: RFValue(16, 844),
    paddingHorizontal: RFValue(16, 844),
    borderRadius: RFValue(16, 844),
  },
  inputBarText: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(15, 844),
    color: COLORS.primaryTeal500,
  },
  crossImage: { width: 16, height: 16, alignSelf: "flex-end" },
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
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    paddingTop: 24,
    paddingBottom: 43,
    justifyContent: "space-between",
  },
});
export default Styles;
