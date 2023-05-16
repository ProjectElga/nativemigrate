import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SCREENSIZE from "../../constants/ScreenSize";
import COLORS from "../../themes/colors";
const styles = StyleSheet.create({
  wrapper: {
    // paddingTop: RFValue(48, 844),
    backgroundColor: COLORS.monoWhite900,
    height: "100%",
  },
  innerWrapper: {
    paddingTop: RFValue(12, 844),
    paddingHorizontal: RFValue(16, 844),
  },
  scrollViewCardLayout: {
    marginVertical: RFValue(20, 844),
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
