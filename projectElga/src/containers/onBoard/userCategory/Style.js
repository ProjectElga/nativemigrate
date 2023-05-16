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
    fontSize: RFValue(14,844),
    color: COLORS.monoBlack900,
  },
  sMainBox: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius:RFValue(12, 844),
    paddingTop: RFValue(24, 844),
    paddingRight: RFValue(96, 844),

    paddingBottom: RFValue(24, 844),
    marginRight: RFValue(16, 844),
  },
  sSubBox:{
    backgroundColor: COLORS.monoWhite900,
    borderRadius:RFValue(12,844),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: RFValue(24,844),
    paddingHorizontal: RFValue(64,844),
    marginRight: RFValue(12,844),
    marginBottom: RFValue(16,844),

    borderColor: COLORS.monoBlack700,
  },
  wrapper: {
    backgroundColor: COLORS.monoWhite900,
    width: "100%",
    height: "100%",
    paddingHorizontal: RFValue(20, 844),
    paddingTop: RFValue(64, 844),
    paddingBottom: RFValue(24, 844),
    justifyContent: "space-between",
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
  },
  headerContainer: {
    paddingBottom: RFValue(24, 844),
  },
  categoryContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    marginTop:RFValue(24,844),
    marginRight: RFValue(-24, 844),
  },
  horizontalView: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",

  },
  subCategoryContainer: {
    //borderWidth: 2,
    paddingRight: 5,
    paddingTop: RFValue(24, 844),
    paddingLeft: 5,

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
