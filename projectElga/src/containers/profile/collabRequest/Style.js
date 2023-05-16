import { Platform, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../../constants/ScreenSize";
import COLORS from "../../../themes/colors";

const Styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: RFValue(16, 844),
    paddingTop: RFValue(64, 844),
    backgroundColor: COLORS.monoGhost500,
    height: SCREENSIZE.ScreenHeightViewPort,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(24, 844),
    color: COLORS.primaryTeal500,
  },
  detailCard: {
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(16, 844),
    paddingHorizontal: RFValue(22, 844),
    paddingVertical: RFValue(24, 844),
  
  },
  picDetailWrapper: {
    flexDirection: "row",
    marginTop: RFValue(32, 844),
  },
  profilePicture: {
    width: RFValue(88, 844),
    height: RFValue(88, 844),
    borderRadius: RFValue(50, 844),
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius:50
  },
  profileNameText: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack900,
  },
  userNameText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12,844),
    color: COLORS.monoBlack700,
    marginTop: RFValue(8, 844),
  },
  categoryText: {
    marginTop: RFValue(8, 844),
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12,844),
    color: COLORS.monoBlack500,
    paddingTop: RFValue(2, 844),
  },

  bioContainer: {
    marginTop: RFValue(32, 844),
    backgroundColor: COLORS.monoGhost500,
    padding: RFValue(16, 844),
    borderRadius: RFValue(16, 844),
    paddingTop: RFValue(24, 844),
    width: "100%",
    alignSelf: "center",
  },
  bioText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack700,
    lineHeight: RFValue(24, 844),
  },
  bioCategory: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack700,
  },
  managedByContainer: {
    flexDirection: "row",
    marginTop: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "flex-end",
  },
  managedByText: {
    fontSize: RFValue(12, 844),
    fontFamily: "Poppins_500Medium",
    color: COLORS.monoBlack500,
  },
  managedByPic: {
    width: 16,
    height: 16,
    marginHorizontal: RFValue(10, 844),
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
  textIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectTypeCard:{
    paddingHorizontal: RFValue(32, 844),
    marginTop: RFValue(8, 844),
    paddingVertical: RFValue(12, 844),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(12, 844),
    marginRight: RFValue(12, 844),
  },
  projectTypeCardText:{
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    lineHeight: RFValue(24, 844),
  },
  rupeesContainer:{
    paddingHorizontal: RFValue(10, 844),
    paddingVertical: RFValue(4, 844),
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,
  },
  rupeesText:{
    color: COLORS.primaryTeal500,
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    lineHeight: RFValue(24, 844),
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    paddingTop: 24,
   
    justifyContent: "space-between",
  },
});
export default Styles;
