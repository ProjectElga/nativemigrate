import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../constants/ScreenSize";
import COLORS from "../../themes/colors";
const styles = StyleSheet.create({
  authWrapper: {
    height: "100%",
    width: "100%",
  },
  imageWrapper: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  iconWrapper: {
    width: RFValue(24, 844),
    height: RFValue(24, 844),
    borderRadius: RFValue(50, 844),
  },
  opportunityView: {
    marginTop: RFValue(24, 844),
  },
  greenCircle:{
    marginRight: 6,
    marginBottom: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.monoBlack500,
    alignItems: "center",
    justifyContent: "center",
  },
  greenCircleText:{
    marginTop: 2,
    color: COLORS.monoWhite900,
    fontSize: RFValue(10, 844),
    fontFamily: "Poppins_400Regular",
  },
  innerToggleContainer:{
    width: "100%",
    flexDirection: "row",
    borderBottomWidth:2,
    borderColor:COLORS.monoGhost500,
    justifyContent: "space-between",
    alignItems: "center",
   // marginTop: RFValue(12, 844),
    backgroundColor: COLORS.monoWhite900,
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  filterContainer: {
    backgroundColor: COLORS.monoWhite900,
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(16, 844),
    borderRadius: RFValue(12, 844),
    marginLeft: RFValue(16, 844),

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    paddingTop: RFValue(48, 844),
    backgroundColor: COLORS.monoGhost500,
    height: SCREENSIZE.ScreenHeightViewPort,
    paddingBottom: RFValue(0, 844),
  },
  folioWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  userCardView: {
    marginTop: RFValue(16, 844),
    marginBottom: RFValue(8, 844),
  },

  categoryTab: {
    width: "100%",
    backgroundColor: COLORS.monoWhite900,
   // marginTop: RFValue(16, 844),
    borderRadius: RFValue(12, 844),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 8,
    color: COLORS.monoBlack500,
  },
  categorybutton: {
    paddingVertical: RFValue(12, 844),
    // borderWidth: 2,
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(8, 844),
    width: "33.5%",
    shadowColor: "black",
  },
  requestCard: {
    height: RFValue(56, 844),
    paddingHorizontal: RFValue(16, 844),
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(16, 844),
    flexDirection: "row",
    marginBottom: RFValue(16, 844),
    justifyContent: "space-between",
    alignItems: "center",
  },
  requestCardText: {
    color: COLORS.monoBlack900,
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_600SemiBold",
  },
  cardTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerToggleView:{
    flexDirection: "row",
    marginBottom: RFValue(2, 844),
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:COLORS.monoWhite900,
    paddingVertical:RFValue(16,844),
    paddingHorizontal:RFValue(24,844),
    borderRadius:RFValue(12,844)

  },
  innerToggleViewCircle:{
    flexDirection: "row",
    marginBottom: RFValue(16, 844),
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:COLORS.monoWhite900,
    paddingVertical:RFValue(16,844),
    borderRadius:RFValue(12,844),
    paddingHorizontal:RFValue(16,844),

  },
  innerToggleText:{
    color: COLORS.monoBlack900,
    fontSize: RFValue(16, 844),
    fontFamily: "Poppins_600SemiBold",
  },
  categoryText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(12, 844),
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: RFValue(20, 844),
    flexDirection: "row",
  },
  chatNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primaryTeal400,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  arcivedCardWrapper: {
    shadowColor: "#555555",
    shadowOpacity: 0.05,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingVertical: RFValue(20, 844),
    paddingHorizontal: RFValue(16, 844),
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(16, 844),
    flexDirection: "row",
    marginBottom: RFValue(16, 844),
  },
  innerView: {
    marginLeft: RFValue(24, 844),
    justifyContent: "space-evenly",
    width: "82%",
  },
  innerViewForSent: {
    marginLeft: RFValue(24, 844),
    justifyContent: "space-evenly",
    width: "62%",
  },
  profilePictureView: {
    width: "18%",
    alignItems: "center",
    justifyContent: "center",
  },

  profilePicture: {
    width: RFValue(64, 844),
    height: RFValue(64, 844),
    borderRadius: RFValue(50, 844),
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: RFValue(50, 844),
  },
  projectTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(12, 844),
    color: COLORS.monoBlack900,
  },
  date: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 8,
    color: COLORS.monoBlack700,
  },
  categoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: RFValue(20, 844),
    flexDirection: "row",
  },
  category1: {
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.primaryTeal400,
    height: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "center",
  },
  category1Text: {
    color: COLORS.monoWhite900,
    fontSize: 8,
    fontFamily: "Poppins_600SemiBold",
    marginHorizontal: RFValue(8, 844),
  },
  category2: {
    borderRadius: RFValue(12, 844),
    backgroundColor: COLORS.monoGhost500,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
    height: RFValue(16, 844),
  },
  category2Text: {
    color: COLORS.primaryTeal500,
    fontSize: 8,
    fontFamily: "Poppins_600SemiBold",
    marginHorizontal: RFValue(8, 844),
  },
  description: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 8,
    color: COLORS.monoBlack500,
  },
  closebuttonView: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  onGoingLoaderContainer: {
    backgroundColor: COLORS.monoWhite900,
    width: "100%",
    height: RFValue(100, 844),
    padding: RFValue(16, 844),
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: COLORS.monoGhost500,
  },
  loaderInnerView: {
    marginLeft: RFValue(16, 844),
    width: "50%",
    height: "100%",
    marginTop: 8,
  },
});

export default styles;
