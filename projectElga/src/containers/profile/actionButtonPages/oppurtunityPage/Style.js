import { Platform, StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../../../constants/ScreenSize";
import COLORS from "../../../../themes/colors";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width - RFValue(32, 844);
const Styles = StyleSheet.create({
  wrapper: {
   
    paddingTop: RFValue(64, 844),

    backgroundColor: COLORS.monoWhite900,
    height: "90%",
    paddingBottom:RFValue(120,844)

   
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
  blackCross: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
  },
  textContainer: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  textIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: RFValue(12, 844),
  },
  pricingPlusContainer: {
    marginTop: RFValue(16, 844),
    paddingTop: RFValue(8, 844),
    paddingBottom: RFValue(8, 844),
    alignItems: "center",
    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(12, 844),
    width: RFValue(124, 844),
  },
  componentText: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(16, 844),
    marginLeft: RFValue(8, 844),
    color: COLORS.monoBlack900,

  },
  icon: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
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
    fontSize: RFValue(12, 844),
    lineHeight: RFValue(24, 844),
  },
  bodyWrapper: {
    paddingTop: RFValue(24, 844),
    width: "100%",
   marginBottom:RFValue(24, 844),
  },
  datePicker: {
    paddingHorizontal: RFValue(24, 844),
    color: COLORS.monoBlack500,
    marginTop: RFValue(12, 844),
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,
    width: "100%",
   
  },
  componentText: {
    paddingHorizontal: RFValue(8, 844),
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack900,
  },
  addImageContainer: {
    backgroundColor: COLORS.monoGhost500,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: undefined,
    aspectRatio: 16 / 9,
    borderRadius: RFValue(12, 844),
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
    height: undefined,
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
  indicatorsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    width: 160,
    marginBottom: 20,
    flexDirection:"row",
    zIndex:1,
  },
  inActiveIndicator: {
    backgroundColor: "#1F9980",
    width: 8,
    height: 8,
    borderRadius: 50,
  },
  activeIndicator: {
    backgroundColor: "#C4C4C4",
    width: 8,
    height: 8,
    borderRadius: 50,
  },
});
export default Styles;
