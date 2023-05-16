import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";

const Styles = StyleSheet.create({
  button: {

    height: RFValue(56, 844),
    backgroundColor: COLORS.monoBlack900,
    borderRadius: RFValue(16, 844),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(16, 844),
    color: COLORS.monoWhite900,
  },
});
export default Styles;
