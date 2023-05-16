import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../constants/ScreenSize";
import COLORS from "../../themes/colors";
const styles = StyleSheet.create({
  wrapper: {
    height: SCREENSIZE.ScreenHeightViewPort,
    paddingHorizontal: RFValue(16, 844),
  },
  infoContainer: {
    paddingVertical: RFValue(48, 844),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  infoBtnContainer: {
    paddingVertical: RFValue(22, 844),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  exploreBtn: {
    borderWidth: 1,
    borderColor: COLORS.monoBlack900,
    width: "40%",
    padding: RFValue(10, 844),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(20,844)
  },
  svgIconContainer: {
    width: RFValue(44, 844),
    height: RFValue(44, 844),
    backgroundColor: COLORS.monoGhost500,
    borderRadius: RFValue(1000, 844),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  infoTextContainer: {
    marginTop: RFValue(20, 844),
    width: "60%",
  },
  infoText: {
    color: COLORS.monoBlack500,
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
  infoTextSpan: {
    color: COLORS.monoBlack700,
    fontSize: RFValue(14, 844),
    fontFamily: "Poppins_500Medium",
  },
  sectionTitle: {
    color: COLORS.monoBlack700,
    fontSize: RFValue(16, 844),
    fontFamily: "Poppins_500Medium",
  },
  bottomCardWrapper: {
    marginTop: RFValue(14, 844),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  creatorCard: {
    width: "48%",
    marginBottom: "4%",
  },
});
export default styles;
