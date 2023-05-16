import { Platform, StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../../constants/ScreenSize";
import COLORS from "../../../themes/colors";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const Styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: RFValue(16, 844),
    backgroundColor: COLORS.monoGhost500,
    height: SCREENSIZE.ScreenHeightViewPort,
  },
  wrapperLoad: {
    paddingHorizontal: RFValue(16, 844),
    backgroundColor: COLORS.monoGhost500,
    height: "100%",
  },
  socialInfoCard: {
    marginTop: RFValue(24, 844),
  },
  detailCard: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(16, 844),
    paddingHorizontal: RFValue(22, 844),
    paddingVertical: RFValue(22, 844),
  },
  profileHeaderBtn: {
    backgroundColor: COLORS.monoWhite900,
    borderRadius: 100,
    width: RFValue(40, 844),
    height: RFValue(40, 844),
    alignItems: "center",
    justifyContent: "center",
  },
  modalWrapper: {
    width: width,
    height: height,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.monoBlack500,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 0,
  },
  modalCard: {
    width: RFValue(250, 844),
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(12, 844),
    zIndex: 1,
    paddingHorizontal: RFValue(24, 844),
    paddingTop: RFValue(24, 844),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalPricingText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(20, 844),
    color: COLORS.primaryTeal500,
  },
  modalColumnWrapper: {
    paddingBottom: RFValue(24, 844),
  },

  modalColumnValues: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: "#161616",
    alignItems: "flex-start",
    marginTop: RFValue(24, 844),
  },
  divider: {
    marginTop: RFValue(20, 844),
    borderWidth: 1,
    borderColor: COLORS.monoGhost500,
    width: "100%",
  },
  sendIconContainer: {
    backgroundColor: COLORS.monoGhost500,
    width: "20%",
    borderRadius: RFValue(12, 844),
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(12, 844),
    marginLeft: "-10%",
  },
  picDetailWrapper: {
    //flexDirection: "row",
  },
  profilePicture: {
    width: RFValue(88, 844),
    height: RFValue(88, 844),
    borderRadius: RFValue(50, 844),
    borderWidth: 1.5,
    borderColor: COLORS.monoGhost500,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 50,
    backgroundColor: '#E8A0BF'
  },
  profileNameText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack900,
    marginTop: RFValue(12, 844),
  },
  categoryText: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack700,
  },
  userNameText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack700,
  },
  bioText: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack700,
    lineHeight: RFValue(24, 844),
    marginLeft: 8,
  },
  bioCategory: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFValue(14, 844),
    color: COLORS.primaryTeal500,
  },

  input: {
    paddingRight: RFValue(10, 844),
    paddingLeft: 0,
    color: COLORS.monoBlack500,
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(12, 844),
    alignItems: "center",
    width: "90%",
    height: RFValue(60, 844),
  },
  searchIcon: {
    padding: RFValue(10, 844),
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
    marginTop: RFValue(16, 844),
  },

  saveButton: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: RFValue(12, 844),
    height: RFValue(56, 844),
    paddingHorizontal: RFValue(10, 844),
    backgroundColor: COLORS.monoGhost500,
    width: "22%",
  },
  bioContainer: {
    paddingTop: RFValue(12, 844),
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
  },
  bioButton: {
    //backgroundColor: COLORS.n,
    borderWidth: 1,
    borderColor: COLORS.monoBrightGray,
    borderRadius: RFValue(24, 844),
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  coverImageContainer: {
    position: "absolute",
    width: width,
    height: undefined,
    aspectRatio: 16 / 9,
    zIndex: 0,
  },

  buttonWrapper: {
    paddingTop: RFValue(16, 844),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryBar: {
    flexDirection: "row",
    width: width - 32,

    alignSelf: "center",
    justifyContent: "space-between",
    paddingHorizontal: RFValue(12, 844),
    marginTop: RFValue(16, 844),
    borderRadius: RFValue(12, 844),
  },
  citationWrapper: {
    width: "100%",
    borderRadius: RFValue(16, 844),
    marginTop: RFValue(16, 844),
    backgroundColor: COLORS.monoWhite900,
    paddingHorizontal: RFValue(32, 844),
    paddingBottom: RFValue(40, 844),
    alignItems: "center",
    marginBottom: RFValue(24, 844),
    paddingTop:RFValue(12,844),

  },
  citationWrapperSelfView: {
    width: "100%",
    borderRadius: RFValue(16, 844),
    marginTop: RFValue(16, 844),
    backgroundColor: COLORS.monoWhite900,
    paddingVertical:RFValue(12,844),
    paddingHorizontal: RFValue(32, 844),
    alignItems: "center",
    marginBottom: RFValue(24, 844),
  },
  citationWrapperLinks: {
    width: "100%",
    marginBottom: RFValue(24, 844),
  },
  folioWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  companyContainer: {
    paddingTop: RFValue(24, 844),
    paddingBottom: RFValue(16, 844),
    paddingHorizontal: RFValue(24, 844),
    marginTop: RFValue(16, 844),
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(16, 844),
    marginBottom: RFValue(20, 844),
  },
  companyDetailTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  companyDetailTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFValue(16, 844),
    color: COLORS.monoBlack700,
  },
  divider: {
    width: "100%",
    borderColor: COLORS.monoGhost500,
    borderWidth: 1,
    marginTop: RFValue(16, 844),
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(16, 844),
  },
  editText: {
    marginLeft: RFValue(8, 844),
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack500,
  },
  skillsText: {
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.monoBlack700,
    fontSize: RFValue(14, 844),
    marginTop: RFValue(16, 844),
  },
});
export default Styles;
