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
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  bodyWrapper: {
    paddingHorizontal: RFValue(16, 844),
  },
  horizontalScrollView: {
    paddingHorizontal: RFValue(16, 844),
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: RFValue(16, 844),
    paddingHorizontal: RFValue(16, 844),
    width: "100%",
  },
  filterContainer: {
    backgroundColor: COLORS.monoWhite900,
    paddingHorizontal: RFValue(16, 844),
    paddingVertical: RFValue(16, 844),
    borderRadius: RFValue(12, 844),
    marginLeft: RFValue(16, 844),

    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    paddingTop: RFValue(48, 844),
    backgroundColor: COLORS.monoGhost500,
    height: SCREENSIZE.ScreenHeightViewPort,
  },
  bottomContainer: {
    alignItems: "center",
  },

  logo: {
    height: RFValue(27, 844),
    width: RFValue(147, 844),
    resizeMode: "contain",
    marginBottom: RFValue(10, 844),
    marginTop: RFValue(75, 844),
  },
  searchIcon: {
    padding: RFValue(10, 844),
  },
  input: {
    paddingRight: RFValue(10, 844),
    paddingLeft: 0,
    color: COLORS.monoBlack500,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    alignItems: "center",
    width: "90%",
  },

  searchSection: {
    // flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.monoWhite900,
    paddingVertical: RFValue(8, 844),
    borderRadius: RFValue(12, 844),

    width: "80%",
  },
  sectionTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(20, 844),
    lineHeight: RFValue(40, 844),
    color: COLORS.monoBlack900,
    marginBottom: RFValue(16, 844),
    marginLeft: RFValue(8, 844),
  },
  scrollWrapper: {
    paddingTop: 0,
  },
  scrollDetailWrapper: {
    paddingTop: RFValue(0, 844),
  },
  userCardView: {
    paddingVertical: RFValue(16, 844),
  },
  userCardDetailView: {
    paddingVertical: RFValue(16, 844),
  },
  toggleSwitchView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(16, 844),
    width: "100%",
  },
  toggleSwitch: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    lineHeight: RFValue(24, 844),
    color: COLORS.monoBlack900,
  },
  toggleSwitchActive: {
    fontFamily: "Poppins_700Bold",
    fontSize: RFValue(20, 844),
    lineHeight: RFValue(28, 844),
    color: COLORS.monoBlack900,
  },
  toggleSwitchActiveIcon: {
    width: 6,
    height: 6,
    borderRadius: RFValue(50, 844),
    backgroundColor: COLORS.primaryTeal400,
    marginHorizontal: 6,
  },
  flexBoxCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  skeletonCategoriesWrapper: {
    paddingHorizontal: RFValue(16, 844),
    flexDirection: "row",
    width: "100%",
    marginTop: RFValue(16, 844),
  },
  skeletonCategoryCard: {
    backgroundColor: COLORS.monoWhite900,
    width: RFValue(156, 844),
    height: RFValue(96, 844),
    borderRadius: RFValue(15, 844),
    marginRight: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#555555",
    shadowColor: "#555555",
    shadowOpacity: 0.05,
    elevation: 3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  sCategoryStick: {
    width: "50%",
    borderRadius: RFValue(12, 844),
    height: RFValue(16, 844),
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
});

export default styles;
