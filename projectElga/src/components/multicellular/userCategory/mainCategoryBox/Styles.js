import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
const Styles = StyleSheet.create({
  mcContainer: {
    borderRadius: RFValue(12, 844),
    justifyContent: "center",
    alignItems: "center",
    // marginTop:5,

    paddingRight: RFValue(24, 844),
    paddingLeft: RFValue(24, 844),
    height: RFValue(48, 844),
    marginRight: RFValue(16, 844),
  },
  mcContainerwithIcon: {
    borderRadius: RFValue(12, 844),

    justifyContent: "center",
    alignItems: "center",
    // marginTop:5,
    height: RFValue(48, 844),
    paddingRight: RFValue(14, 844),
    paddingLeft: RFValue(12, 844),

    marginRight: RFValue(10, 844),
  },
  mcText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack900,
  },
  icon: {
    width: 16,
    height: 16,
    marginHorizontal: 10,
  },
});
export default Styles;
