import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import COLORS from "../../../../themes/colors";
const Styles = StyleSheet.create({
  scContainer: {
    backgroundColor: COLORS.monoWhite900,
    borderRadius:RFValue(12,844),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: RFValue(12,844),
    paddingHorizontal: RFValue(24,844),
    marginRight: RFValue(12,844),
    marginBottom: RFValue(16,844),
    borderWidth: 1,
    borderColor: COLORS.monoBlack700,

  },
  scContainerActive: {
    backgroundColor: COLORS.monoBlack700,
    borderRadius: RFValue(15,844),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: RFValue(12,844),
    paddingHorizontal: RFValue(24,844),
    marginRight: RFValue(12,844),
    marginBottom: RFValue(16,844),
    borderWidth: 1,
    borderColor: "transparent",

  },
  scText: {
    fontFamily: "Poppins_500Medium",
    fontSize: RFValue(14,844),
    color: COLORS.monoBlack700,
  },
});
export default Styles;
