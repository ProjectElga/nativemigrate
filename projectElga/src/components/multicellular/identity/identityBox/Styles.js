import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";

const Styles = StyleSheet.create({
  identityboxView: {
    backgroundColor: COLORS.monoWhite900,
    borderRadius: RFValue(15, 844),
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

    // borderWidth: 1,
    // borderColor: COLORS.monoChromeBlack,
  },
  identityboxText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14, 844),
    color: COLORS.monoBlack900,
  },
  loaderSnipper: { position: "absolute", right: "45%" },
});
export default Styles;
