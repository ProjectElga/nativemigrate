import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../../constants/ScreenSize";
import COLORS from "../../../themes/colors";
const styles = StyleSheet.create({
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
});

export default styles;
