import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../themes/colors";

const Styles = StyleSheet.create({
  headerText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(50, 844),
    color: COLORS.primaryTeal500,
    lineHeight: RFValue(54, 844),
  },
  headerSubTitleText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(24, 844),
    color: COLORS.monoBlack900,
  },
  headerDetailText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: COLORS.monoBlack900,
  },
  pageWrapper: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: RFValue(25, 844),
    backgroundColor: COLORS.monoGhost500,
    paddingTop: RFValue(76, 844),
    paddingBottom: RFValue(15, 844),
    position:"relative"
    //borderWidth:2,
  },
  searchSection: {
    // flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.monoWhite900,
    width: "100%",
    paddingVertical: RFValue(10, 844),
    borderRadius: RFValue(15, 844),
    paddingLeft: RFValue(20, 844),
    paddingRight: RFValue(10, 844),
    marginTop: RFValue(30, 844),
  },
  searchIcon: {
    padding: RFValue(10, 844),
  },
  input: {
    flex: 1,
    paddingRight: RFValue(10, 844),
    paddingLeft: 0,
    color: "#424242",
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    alignItems: "center",
    paddingTop: RFValue(5, 844),
  },
  headerContainer: {
    paddingBottom: RFValue(24, 844),
  },
  categoryContainer: {
    paddingRight: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  horizontalView: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  subCategoryContainer: {
    //borderWidth: 2,
    paddingRight: 5,
    paddingTop: RFValue(16, 844),
    paddingLeft: 5,
    borderTopWidth: 1,
    borderTopColor: COLORS.monoBrightGray,
    marginTop: 5,
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  identityLogo: {
    paddingLeft: RFValue(15, 844),
    paddingRight: RFValue(15, 844),
    paddingTop: 5,
    paddingBottom: 30,
    alignItems: "center",
  },
  flexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    paddingHorizontal: 10,
    zIndex: 1,
    bottom: 70,
    //borderWidth: 2,
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack700,
    paddingHorizontal: 15,
  },
});
export default Styles;
