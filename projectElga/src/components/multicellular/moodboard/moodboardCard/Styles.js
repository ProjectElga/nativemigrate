import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
const borderRadius = RFValue(12, 844);
export const Styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: RFValue(24, 844),
    paddingVertical: RFValue(12, 844),
    backgroundColor: COLORS.monoWhite900,
    borderRadius:borderRadius,
    marginBottom: "2%",
    marginHorizontal: "1%",
    marginTop: RFValue(2,844)
  },
  borderView:{
    borderWidth:0.75,
    borderColor: COLORS.monoChromeBlack
  },
  headerSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: RFValue(20, 844),
    marginBottom: RFValue(10, 844),

  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconWrapper:{
    width: RFValue(25, 844),
    height: RFValue(25, 844),
    borderRadius: RFValue(50, 844),
    backgroundColor: COLORS.monoWhite900,
    alignItems: "center",
    justifyContent: "center",
  },
  profile:{
    width: "100%",
    height: "100%",
    shadowColor: "#555555",
    shadowOpacity: Platform.OS == "ios" ? 0.7 : 0.7,
    //elevation: Platform.OS == "ios" ? 3 : 1,
    borderRadius: RFValue(1000, 844),
    backgroundColor: '#E8A0BF'
  },
  
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginLeft: RFValue(20, 844),
  },
  infoContainer: {
    marginBottom: RFValue(18, 844),
  },
  imageBgContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  imageBgContainerInner: {
    paddingRight: RFValue(12, 844),
  },
  images: {
    width: RFValue(64, 844),
    height: RFValue(64, 844),
    borderRadius: RFValue(12, 844),
  },
  text: {
    color: COLORS.monoBlack900,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
  },
  title: {
    color: COLORS.monoBlack900,
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(20, 844),
  },
  sharedTextContainer: {
    backgroundColor: "#52ccb366",
    paddingHorizontal: RFValue(12, 844),
    paddingVertical: RFValue(4, 844),
    borderRadius: 100,
    height: RFValue(22, 844),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sharedText: {
    color: COLORS.primaryTeal500,
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(10, 844),
  },
});
