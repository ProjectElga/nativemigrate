import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../constants/ScreenSize";
import COLORS from "../../themes/colors";
const Styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: RFValue(16, 844),
    paddingTop: RFValue(48, 844),
    backgroundColor: COLORS.monoWhite900,
    height: "100%",
  },
  searchIcon: {
    padding: RFValue(10, 844),
  },
  categoryTab: {
    width: "100%",
    backgroundColor: COLORS.monoWhite900,
    //marginTop: RFValue(12, 844),
    borderRadius: RFValue(12, 844),
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  categoryText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: RFValue(20, 844),
    flexDirection: "row",
  },
  categorybutton: {
    paddingVertical: RFValue(12, 844),
    paddingHorizontal: RFValue(16, 844),
    // borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(12, 844),
    // width: "25%",
    shadowColor: "black",
    marginRight: RFValue(12,844)
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
  resultWrapper: {
    flexDirection: "row",
    paddingTop: RFValue(16, 844),
    paddingBottom: RFValue(12, 844),
    alignItems: "center",
    marginLeft: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.monoGhost500,
  },
  skeletonUserCard: {
    width: "100%",
    // height: RFValue(118, 844),
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(20, 844),
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(15, 844),
    marginBottom: RFValue(16, 844),
    flexDirection: "row",
  },
  sCardProfile: {
    width: RFValue(72, 844),
    height: RFValue(72, 844),
    borderRadius: RFValue(50, 844),
  },
  sCardBlock: {
    justifyContent: "space-around",

    marginLeft: RFValue(16, 844),
    width: "70%",
  },
  sCardStick: {
    height: RFValue(16, 844),
    borderRadius: RFValue(12, 844),
  },
  resultImage: {
    width: RFValue(40, 844),
    height: RFValue(40, 844),
    borderRadius: RFValue(12, 844),
    marginRight: RFValue(24, 844),
    backgroundColor:COLORS.monoGhost500,


alignItems:"center",
justifyContent:"center"
  },
  resultText: {
    color: COLORS.monoBlack700,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(16, 844),
  },
  resultTextSmall: {
    color: COLORS.monoBlack500,
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
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
    //width: "100%",
  },
  tagTitle: {
    color: COLORS.monoBlack900,
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(16, 844),
    marginLeft: 8,
    marginTop: RFValue(24, 844),
  },
  projectTypeCard: {
    marginTop: RFValue(16, 844),
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(12, 844),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(12, 844),
    marginRight: RFValue(12, 844),
  },
  projectTypeCardText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
  },
  userCardView: {
    marginTop: RFValue(24, 844),
    paddingBottom: RFValue(24, 844),
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  filterContainer: {
    backgroundColor: COLORS.monoGhost500,
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(16, 844),
    borderRadius: RFValue(12, 844),
    marginLeft: RFValue(16, 844),
    marginTop: RFValue(30, 844),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
    borderRadius: RFValue(50, 844),
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
export default Styles