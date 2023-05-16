import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../constants/ScreenSize";
import COLORS from "../../themes/colors";

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: RFValue(48, 844),
    backgroundColor: COLORS.monoGhost500,
    height: SCREENSIZE.ScreenHeightViewPort,
    paddingHorizontal: RFValue(16, 844),
  },
  scrollView: {},
  feedLayout: {
    marginTop: "4%",
  },
  feedLayout2: {
    marginTop: "2%",
  },
  pageTitle: {
    color: COLORS.monoBlack500,
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(18, 844),
    marginHorizontal: RFValue(12, 844),
  },
  divider: {
    width: RFValue(80, 844),
    height: RFValue(1, 844),
    backgroundColor: COLORS.monoBlack500,
    borderRadius: RFValue(100,844)
  },
  titleSection: {
    paddingHorizontal: RFValue(8, 844),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mb12:{
    marginBottom: RFValue(16,844)

  },
  actionButtonWidth: {
    width: "90%",
    paddingLeft: RFValue(1, 844),
    justifyContent: "flex-start",
  },
  actionButtonContainer: {
    width: "48%",
    marginTop: RFValue(4, 844),
  },
  smallCardContainer: {
    width: "48%",
    height: RFValue(170, 844),
    marginVertical: "4%",
  },
  smallCardView: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: RFValue(12, 844),
    overflow: "hidden",
    padding: RFValue(10, 844),
  },
  smallCardTitle: {
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(16, 844),
  },
  smallCardMediaKitTitle: {
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(16, 844),
    width: "70%",
  },
  userCardView: {
    paddingVertical: RFValue(24, 844),
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
  smallCardSubTitle: {
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
  },
  smallCardMediaKitSubTitle: {
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    width: "50%",
  },
  smallCardMediaKitsmallText: {
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    lineHeight: RFValue(16, 844),
    width: "50%",
    marginTop: RFValue(-6, 844),
  },
  smallCardMediaKitNumber: {
    color: COLORS.monoWhite900,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(48, 844),
    lineHeight: RFValue(60, 844),
  },
  mediaKitContainer: {
    width: "100%",
    height: RFValue(224, 844),
    backgroundColor: COLORS.monoWhite900,
  },
  mediaKitInner: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: RFValue(12, 844),
    overflow: "hidden",
    height: RFValue(224, 844),
    paddingTop: RFValue(10, 844),
    paddingBottom: RFValue(10, 844),
    paddingLeft: RFValue(20, 844),
    paddingRight: RFValue(10, 844),
  },
  adContainer: {
    // marginTop: RFValue(12, 844),
    width: "100%",
    borderRadius: RFValue(12, 844),
    backgroundColor: "#DAE2F8"
  },
  adImages: {
    width: "100%",
    height: RFValue(68, 844),
  },
  slideStyle: {
    borderRadius: RFValue(12, 844),
    overflow: "hidden",
  },
});

export default styles;
