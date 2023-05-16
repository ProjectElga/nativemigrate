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
  scrollViewCardLayout: {
    marginTop: RFValue(20, 844),
  },
  itemCardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  itemCard: {
    // width: "48%",
    marginBottom: RFValue(20, 844),
  },
  mr_5: {
    marginRight: RFValue(5, 844),
  },
  ml_5: {
    marginLeft: RFValue(5, 844),
  },
});
export default styles;
